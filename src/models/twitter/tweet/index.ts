import TwitterUser from "../user";

export class TwitterTweet {
    public readonly author: TwitterUser;
    public readonly message: string;
    public readonly postDate: Date;

    public constructor(author: TwitterUser, message: string, postDate: Date) {
        this.author = author;
        this.message = message;
        this.postDate = postDate;
    }
}