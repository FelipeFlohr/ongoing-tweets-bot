import { TwitterTweet } from "../../models/twitter/tweet";
import TwitterUser from "../../models/twitter/user";

interface ITwitterRepository {
    fetchTweetById(id: string): Promise<TwitterTweet>
    fetchUserById(id: string): Promise<TwitterUser>
    fetchUserByUrl(url: string): Promise<TwitterUser>
    fetchUserByUsername(username: string): Promise<TwitterUser>
}

export default ITwitterRepository;