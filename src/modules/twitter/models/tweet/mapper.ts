import { injectable, inject } from "inversify";
import { TwitterTweet } from ".";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ITwitterRepository from "../../repositories/twitter_repository";
import Mapper from "../../../mapper/models/mapper";
import { TweetWithheld } from "./types/tweet_withheld";
import TwitterUser from "../user";
import InvalidJsonError from "../../../mapper/models/errors/invalid_json";

@injectable()
export default class TwitterTweetMapper extends Mapper<TwitterTweet> {
    private readonly twitterRepository: ITwitterRepository;

    public constructor(
        @inject(TYPES.TwitterRepository) twitterRepository: ITwitterRepository
    ) {
        super();
        this.twitterRepository = twitterRepository;
    }
    
    public async fromJsonArray(
        val: unknown
    ): Promise<TwitterTweet[]> {
        if (!this.isRecordStringUnknown(val)) {
            throw new InvalidJsonError(val);
        }

        const apiVal = val as ApiTweetArrayResponse;
        const user = await this.twitterRepository.fetchUserById(apiVal.data[0].author_id);
        const result: TwitterTweet[] = [];

        for (const tweet of apiVal.data) {
            result.push(await this.parseTweet(tweet, user));
        }

        return result;
    }

    protected override async fromJsonImpl(
        val: Record<string, unknown>
    ): Promise<TwitterTweet> {
        const apiVal = val as ApiTweetResponse;
        const result = await this.parseTweet(apiVal.data);

        return result;
    }

    private async parseTweet(tweet: Tweet, forceUser?: TwitterUser): Promise<TwitterTweet> {
        const user = forceUser ? forceUser : await this.twitterRepository.fetchUserById(
            tweet.author_id
        );
        const withheld: TweetWithheld | undefined =
            tweet.withheld !== undefined
                ? {
                    countryCodes: tweet.withheld.country_codes,
                    isCopyright: tweet.withheld.copyright,
                    scope: tweet.withheld.scope,
                }
                : undefined;
        const result = new TwitterTweet(
            user,
            tweet.text,
            new Date(tweet.created_at),
            withheld
        );

        return result;
    }
}

type Tweet = {
    readonly edit_history_tweet_ids: string[];
    readonly text: string;
    readonly id: string;
    readonly created_at: string;
    readonly author_id: string;
    readonly withheld?: {
        readonly copyright: boolean;
        readonly country_codes: string[];
        readonly scope: string;
    };
};

type ApiTweetResponse = {
    readonly data: Tweet;
};

type ApiTweetArrayResponse = {
    readonly data: Tweet[];
}
