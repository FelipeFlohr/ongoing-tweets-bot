import TwitterStream from "../../models/twitter_stream/twitter_stream";
import ITwitterStreamService, {
    UserStreamOptions,
} from "../twitter_stream_service";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import TwitterStreamRule from "../../models/twitter_stream_rule/twitter_stream_rule";
import ITwitterStreamRepository from "../../repositories/twitter_stream_repository";
import { TwitterTweet } from "../../../twitter/models/tweet";
import TwitterTweetMapper from "../../../twitter/models/tweet/mapper";
import ITwitterRepository from "../../../twitter/repositories/twitter_repository";
import log, { LogLevel } from "../../../../utils/logger";
import TwitterUser from "../../../twitter/models/user";
import TwitterStreamUrls from "../../constants/urls";

@injectable()
export default class TwitterStreamServiceImpl implements ITwitterStreamService {
    public lastStreamDisconnection?: Date;
    private readonly twitterRepository: ITwitterRepository;
    private readonly twitterStreamRepository: ITwitterStreamRepository;
    private twitterStream?: TwitterStream;

    public constructor(
        @inject(TYPES.TwitterStreamRepository)
            twitterStreamRepository: ITwitterStreamRepository,
        @inject(TYPES.TwitterRepository) twitterRepository: ITwitterRepository
    ) {
        this.twitterStreamRepository = twitterStreamRepository;
        this.twitterRepository = twitterRepository;
    }

    public async getStream(options: UserStreamOptions): Promise<TwitterStream> {
        if (this.twitterStream) {
            return this.twitterStream;
        }

        const stream = await this.twitterStreamRepository.fetchStream({
            onData: async (data) => {
                await this.onDataEncapsulation(data, options.onData);
            },
            onError: async (error) => {
                await this.onErrorEncapsulation(
                    error,
                    stream,
                    options,
                    options.onError
                );
            },
            onEnd: options.onEnd,
            path: TwitterStreamUrls.stream,
        });
        return stream;
    }

    public closeStream(): void {
        this.twitterStream?.close();
        this.twitterStream = undefined;
    }

    public async getRules(): Promise<TwitterStreamRule[]> {
        const rules = await this.twitterStreamRepository.fetchRules();
        return rules;
    }

    public async removeRule(rule: TwitterStreamRule): Promise<void> {
        return await this.twitterStreamRepository.removeRuleById(rule.id);
    }

    public async addRuleToTargetUser(user: TwitterUser): Promise<TwitterStreamRule> {
        const rule = await this.twitterStreamRepository.addRule(`from:${user.username}`);
        return rule;
    }

    private async onErrorEncapsulation(
        error: unknown,
        stream: TwitterStream,
        options: UserStreamOptions,
        cb?: (error: unknown) => void
    ) {
        const date = new Date();
        if (error instanceof Error) {
            log(
                `The Twitter stream returned an error: ${error.message}`,
                LogLevel.ERROR
            );
        } else {
            log(
                `The Twitter stream returned an error: ${error}`,
                LogLevel.ERROR
            );
        }

        if (cb) {
            cb(error);
        }

        this.closeStream();
        log("Cancelled Twitter stream. Creating a new one", LogLevel.WARN);
        this.lastStreamDisconnection = date;

        const newStream = await this.getStream(options);
        this.twitterStream = newStream;
        log("New Twitter stream created");
    }

    private async onDataEncapsulation(
        data: unknown,
        cb: (data: TwitterTweet) => void
    ) {
        let parsedData: TwitterTweet | undefined;

        try {
            parsedData = await new TwitterTweetMapper(
                this.twitterRepository
            ).fromJson(JSON.parse(data as string));
        } catch (err) {
            if (err instanceof Error) {
                log(
                    `Impossible to parse the tweet: ${err.message}`,
                    LogLevel.ERROR
                );
            } else {
                log(`Impossible to parse the tweet: ${err}`, LogLevel.ERROR);
            }
        }

        if (parsedData) {
            cb(parsedData);
        }
    }
}
