import { TwitterTweet } from "../../../models/twitter/tweet";
import TwitterTweetMapper from "../../../models/twitter/tweet/mapper";
import TwitterUser from "../../../models/twitter/user";
import TwitterUserMapper from "../../../models/twitter/user/mapper";
import ITwitterHttpGet from "../../../services/twitter_http_get/services/twitter_http_get";
import TYPES from "../../../types/dependency_injection/dependency_injection";
import TwitterUrls from "../constants/twitter_urls";
import ITwitterRepository from "../twitter_repository";
import { inject, injectable } from "inversify";

@injectable()
export default class TwitterRepository implements ITwitterRepository {
    private readonly twitterHttpGet: ITwitterHttpGet;

    public constructor(
        @inject(TYPES.TwitterHttpGet) twitterHttpGet: ITwitterHttpGet,
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
}
