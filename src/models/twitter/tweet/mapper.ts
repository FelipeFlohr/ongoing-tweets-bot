import { inject, injectable } from "inversify";
import { TwitterTweet } from ".";
import Mapper from "../../mapper/mapper";
import TYPES from "../../../types/dependency_injection/dependency_injection";
import ITwitterRepository from "../../../repositories/twitter/twitter_repository";

@injectable()
export default class TwitterTweetMapper extends Mapper<TwitterTweet> {
    private readonly twitterRepository: ITwitterRepository;

    public constructor(@inject(TYPES.TwitterRepository) twitterRepository: ITwitterRepository) {
        super();
        this.twitterRepository = twitterRepository;
    }

    protected override async fromJsonImpl(val: Record<string, unknown>): Promise<TwitterTweet> {
        const apiVal = val as ApiTweetResponse;

        const user = await this.twitterRepository.fetchUserById(apiVal.data.author_id);
        const result = new TwitterTweet(user, apiVal.data.text, new Date(apiVal.data.created_at));

        return result;
    }
}

type ApiTweetResponse = {
    readonly data: {
        readonly edit_history_tweet_ids: string[],
        readonly text: string
        readonly id: string
        readonly created_at: string
        readonly author_id: string
    },
}