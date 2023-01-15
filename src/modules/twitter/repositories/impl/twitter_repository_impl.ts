import { injectable, inject } from "inversify";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ITwitterHttpGet from "../../services/twitter_http_get";
import { TwitterTweet } from "../../models/tweet";
import TwitterTweetMapper from "../../models/tweet/mapper";
import TwitterUser from "../../models/user";
import TwitterUserMapper from "../../models/user/mapper";
import TwitterUrls from "../../constants/twitter_urls";
import ITwitterRepository, {
    TweetsByPeriodAndUsernameConfig,
} from "../twitter_repository";

@injectable()
export default class TwitterRepositoryImpl implements ITwitterRepository {
    private readonly twitterHttpGet: ITwitterHttpGet;

    public constructor(
        @inject(TYPES.TwitterHttpGet) twitterHttpGet: ITwitterHttpGet
    ) {
        this.twitterHttpGet = twitterHttpGet;
    }

    public async fetchTweetById(id: string): Promise<TwitterTweet> {
        const path = TwitterUrls.getTweetById(id);
        const res = await this.twitterHttpGet.get(path);

        const user = await new TwitterTweetMapper(this).fromJson(res);
        return user;
    }

    public async fetchUserById(id: string): Promise<TwitterUser> {
        const path = TwitterUrls.getUserById(id);
        const res = await this.twitterHttpGet.get(path);

        const user = await new TwitterUserMapper().fromJson(res);
        return user;
    }

    public async fetchUserByUrl(url: string): Promise<TwitterUser> {
        const username = url.split("https://twitter.com/")[1];
        const user = await this.fetchUserByUsername(username);

        return user;
    }

    public async fetchUserByUsername(username: string): Promise<TwitterUser> {
        const path = TwitterUrls.getUserByUsername(username);
        const res = await this.twitterHttpGet.get(path);

        const user = await new TwitterUserMapper().fromJson(res);
        return user;
    }

    public async fetchTweetsByPeriodAndUsername(
        config: TweetsByPeriodAndUsernameConfig
    ): Promise<TwitterTweet[]> {
        const user = await this.fetchUserByUsername(config.username);
        const path = TwitterUrls.getTweetsBetweenPeriodAndUserId(
            config.initialDate,
            config.finalDate,
            user.id,
            config.maxAmount ? config.maxAmount : 100
        );
        const res = await this.twitterHttpGet.get(path);

        const tweets = await new TwitterTweetMapper(this).fromJsonArray(res);
        return tweets;
    }
}
