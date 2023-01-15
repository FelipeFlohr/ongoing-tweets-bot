import { IntegerRange } from "../../../types/integer_range/integer_range";
import { TwitterTweet } from "../models/tweet";
import TwitterUser from "../models/user";

interface ITwitterRepository {
    fetchTweetById(id: string): Promise<TwitterTweet>
    fetchUserById(id: string): Promise<TwitterUser>
    fetchUserByUrl(url: string): Promise<TwitterUser>
    fetchUserByUsername(username: string): Promise<TwitterUser>
    fetchTweetsByPeriodAndUsername(config: TweetsByPeriodAndUsernameConfig): Promise<TwitterTweet[]>
}

export default ITwitterRepository;

export type TweetsByPeriodAndUsernameConfig = {
    readonly initialDate?: Date
    readonly finalDate: Date
    readonly username: string
    readonly maxAmount?: IntegerRange<1, 101>
}