import { Stream } from "stream";
import { TwitterTweet } from "../models/tweet";
import TwitterUser from "../models/user";
import { TweetsByPeriodAndUsernameConfig } from "../repositories/twitter_repository";

interface ITwitterService {
    getStream(streamUrl: string): Promise<Stream>
    getTweetById(id: string): Promise<TwitterTweet>
    getUserById(id: string): Promise<TwitterUser>
    getUserByUrl(url: string): Promise<TwitterUser>
    getUserByUsername(username: string): Promise<TwitterUser>
    getTweetsByPeriodAndUsername(config: TweetsByPeriodAndUsernameConfig): Promise<TwitterTweet[]>
}

export default ITwitterService;