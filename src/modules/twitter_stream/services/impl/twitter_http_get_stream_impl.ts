import TwitterStream from "../../models/twitter_stream";
import ITwitterHttpGetStream, {
    TwitterHttpGetStreamOptions,
} from "../twtitter_http_get_stream";
import { inject, injectable } from "inversify";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import TwitterHttpGetUrls from "../../../twitter/constants/urls";
import axios from "axios";

@injectable()
export default class TwitterHttpGetStreamImpl implements ITwitterHttpGetStream {
    private readonly environmentSettings: IEnvironmentSettings;

    public constructor(
        @inject(TYPES.EnvironmentSettings)
            environmentSettings: IEnvironmentSettings
    ) {
        this.environmentSettings = environmentSettings;
    }

    public async getStream(
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
}
