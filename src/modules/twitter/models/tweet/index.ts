import TwitterUser from "../user";
import { TweetWithheld } from "./types/tweet_withheld";

export class TwitterTweet {
    public readonly author: TwitterUser;
    public readonly message: string;
    public readonly postDate: Date;
    public readonly withheld?: TweetWithheld;

    public constructor(author: TwitterUser, message: string, postDate: Date, withheld?: TweetWithheld) {
        this.author = author;
        this.message = message;
        this.postDate = postDate;
        this.withheld = withheld;
    }
}