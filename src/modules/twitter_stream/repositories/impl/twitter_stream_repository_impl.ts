import { inject, injectable } from "inversify";
import ITwitterStreamRepository, {
    TwitterHttpGetStreamOptions,
} from "../twitter_stream_repository";
import TwitterStreamRule from "../../models/twitter_stream_rule/twitter_stream_rule";
import ITwitterHttpGet from "../../../twitter/services/twitter_http_get";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import TwitterStreamUrls from "../../constants/urls";
import TwitterStreamRuleMapper from "../../models/twitter_stream_rule/mapper";
import axios from "axios";
import TwitterHttpGetUrls from "../../../twitter/constants/urls";
import TwitterStream from "../../models/twitter_stream/twitter_stream";
import IEnvironmentSettings from "../../../../env/environment_settings";
import ITwitterHttpPost from "../../../twitter/services/twitter_http_post";
import ImpossibleToDeleteStreamRuleError from "../../errors/impossible_to_delete_stream_rule";
import log, { LogLevel } from "../../../../utils/logger";
import ImpossibleToCreateStreamRuleError from "../../errors/impossible_to_create_stream_rule";

@injectable()
export default class TwitterStreamRepositoryImpl
implements ITwitterStreamRepository
{
    private readonly twitterHttpGet: ITwitterHttpGet;
    private readonly twitterHttpPost: ITwitterHttpPost;
    private readonly environmentSettings: IEnvironmentSettings;
    private _lastFetchedRules?: TwitterStreamRule[];

    public constructor(
        @inject(TYPES.TwitterHttpGet) twitterHttpGet: ITwitterHttpGet,
        @inject(TYPES.EnvironmentSettings)
            environmentSettings: IEnvironmentSettings,
        @inject(TYPES.TwitterHttpPost) twitterHttpPost: ITwitterHttpPost
    ) {
        this.twitterHttpGet = twitterHttpGet;
        this.environmentSettings = environmentSettings;
        this.twitterHttpPost = twitterHttpPost;
    }

    public get lastFetchedRules(): TwitterStreamRule[] | undefined {
        return this._lastFetchedRules;
    }

    public async fetchRules(): Promise<TwitterStreamRule[]> {
        const path = TwitterStreamUrls.streamRules;
        const res = await this.twitterHttpGet.get(path);

        const rules = new TwitterStreamRuleMapper().fromJsonArray(res);
        this._lastFetchedRules = rules;
        return rules;
    }

    public async fetchStream(
        options: TwitterHttpGetStreamOptions
    ): Promise<TwitterStream> {
        const parsedUrl = `${
            options.isV2 === undefined || options.isV2 === true
                ? TwitterHttpGetUrls.twitterBaseV2
                : TwitterHttpGetUrls.twitterBase
        }${options.path.startsWith("/") ? options.path : `/${options.path}`}`;

        const authHeader =
            options.withAuth === undefined || options.withAuth === true
                ? {
                    Authorization: `Bearer ${this.environmentSettings.twitter.bearerToken}`,
                }
                : {};
        const headers = options.headers
            ? {
                ...options.headers,
                ...authHeader,
            }
            : authHeader;
        const cancelToken = axios.CancelToken.source();

        const axiosPost = await axios.get(parsedUrl, {
            headers: headers,
            timeout: 20000,
            responseType: "stream",
            cancelToken: cancelToken.token,
        });
        const stream = axiosPost.data as NodeJS.ReadableStream;

        const result = new TwitterStream(
            stream,
            cancelToken,
            options.onData,
            options.onError,
            options.onConnect,
            options.onDisconnect,
            options.onEnd
        );
        return result;
    }

    public async removeRuleById(ruleId: string): Promise<void> {
        try {
            const post =
                await this.twitterHttpPost.post<RemoveRuleByIdApiReturn>(
                    TwitterStreamUrls.streamRules,
                    {
                        delete: {
                            ids: [ruleId],
                        },
                    }
                );

            if (post.meta.summary.deleted !== 1) {
                if (post.meta.summary.not_deleted === 0) {
                    log(
                        `Tried to delete a rule that does not exist: ${ruleId}`,
                        LogLevel.ERROR
                    );
                    throw new ImpossibleToDeleteStreamRuleError(
                        ruleId,
                        "Rule does not exists"
                    );
                }
                throw new ImpossibleToDeleteStreamRuleError(
                    ruleId,
                    `Data: ${JSON.stringify(post)}`
                );
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                log(
                    `Impossible to delete stream rule ${ruleId}. Response: ${err.response?.data}`,
                    LogLevel.ERROR
                );
                throw new ImpossibleToDeleteStreamRuleError(
                    ruleId,
                    err.message
                );
            }
            log(`Impossible to delete stream rule ${ruleId}. Error: ${err}`);
            throw new ImpossibleToDeleteStreamRuleError(
                ruleId,
                `Error: ${err}`
            );
        }
    }

    public async addRule(
        value: string,
        tag?: string | undefined
    ): Promise<TwitterStreamRule> {
        try {
            const post = await this.twitterHttpPost.post<AddRuleApiReturn>(
                TwitterStreamUrls.streamRules,
                {
                    add: [
                        {
                            value: value,
                            tag: tag,
                        },
                    ],
                }
            );

            if (post.meta.summary.created !== 1) {
                throw new ImpossibleToCreateStreamRuleError(
                    value,
                    `Created amount: ${post.meta.summary.created}`
                );
            }
            return new TwitterStreamRule(post.data[0].id, value, tag);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                log(
                    `Impossible to create Twitter Stream Rule. Rule value: ${value} | API Response: ${err.response?.data} | Status: ${err.status}`,
                    LogLevel.ERROR
                );
                throw new ImpossibleToCreateStreamRuleError(value, err.message);
            }
            log(
                `Impossible to create Twitter Stream Rule. Rule value: ${value}. Error: ${err}`,
                LogLevel.ERROR
            );
            throw new ImpossibleToCreateStreamRuleError(
                value,
                `Impossible to create Twitter Stream Rule. Rule value: ${value}. Error: ${err}`
            );
        }
    }
}

type RemoveRuleByIdApiReturn = {
    readonly meta: {
        readonly sent: string;
        readonly summary: {
            readonly deleted: number;
            readonly not_deleted: number;
        };
    };
};

type AddRuleApiReturn = {
    readonly data: {
        readonly value: string;
        readonly id: string;
    }[];
    readonly meta: {
        readonly sent: string;
        readonly summary: {
            readonly created: number;
            readonly not_created: number;
            readonly valid: number;
            readonly invalid: number;
        };
    };
};
