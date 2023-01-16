import axios from "axios";
import { injectable, inject } from "inversify";
import { Stream } from "stream";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ITwitterService from "../twitter_service";
import { TwitterTweet } from "../../models/tweet";
import TwitterUser from "../../models/user";
import ITwitterRepository, { TweetsByPeriodAndUsernameConfig } from "../../repositories/twitter_repository";

@injectable()
export default class TwitterServiceImpl implements ITwitterService {
    private readonly environmentSettings: IEnvironmentSettings;
    private readonly repository: ITwitterRepository;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings, @inject(TYPES.TwitterRepository) twitterRepository: ITwitterRepository) {
        this.environmentSettings = environmentSettings;
        this.repository = twitterRepository;
    }

    public async getStream(streamUrl: string): Promise<Stream> {
        const axiosGet = await axios.get(streamUrl, {
            headers: {
                "Authorization": `Bearer ${this.environmentSettings.twitter.bearerToken}`
            },
            timeout: 20000,
            responseType: "stream"
        });
        const data = await axiosGet.data as Stream;
        return data;
    }

    public async getTweetById(id: string): Promise<TwitterTweet> {
        const res = await this.repository.fetchTweetById(id);
        return res;
    }

    public async getUserById(id: string): Promise<TwitterUser> {
        const res = await this.repository.fetchUserById(id);
        return res;
    }

    public async getUserByUrl(url: string): Promise<TwitterUser> {
        const res = await this.repository.fetchUserByUrl(url);
        return res;
    }

    public async getUserByUsername(username: string): Promise<TwitterUser> {
        const res = await this.repository.fetchUserByUsername(username);
        return res;
    }

    public async getTweetsByPeriodAndUsername(config: TweetsByPeriodAndUsernameConfig): Promise<TwitterTweet[]> {
        const res = await this.repository.fetchTweetsByPeriodAndUsername(config);
        return res;
    }

}
