import { TwitterTweet } from "../../twitter/models/tweet";
import TwitterUser from "../../twitter/models/user";
import TwitterStream from "../models/twitter_stream/twitter_stream";
import TwitterStreamRule from "../models/twitter_stream_rule/twitter_stream_rule";

interface ITwitterStreamService {
    /**
     * Sometimes the stream may disconnect, and
     * this variable holds the date in which the
     * stream was disconnected.
     */
    readonly lastStreamDisconnection?: Date
    /**
     * Returns a working Twitter stream
     * @param options Event callbacks
     */
    getStream(options: UserStreamOptions): Promise<TwitterStream>;
    /**
     * Obtains the current stream rules
     */
    getRules(): Promise<TwitterStreamRule[]>
    /**
     * Closes any ongoing stream
     */
    closeStream(): void
    /**
     * Remove a stream rule by its ID
     * @param ruleId The rule ID
     */
    removeRule(rule: TwitterStreamRule): Promise<void>;
    /**
     * Adds a rule to filter tweets by the user
     * @param user Twitter user
     */
    addRuleToTargetUser(user: TwitterUser): Promise<TwitterStreamRule>;
}

export type UserStreamOptions = {
    readonly onData: (data: TwitterTweet) => void;
    readonly onError?: (error: unknown) => void;
    readonly onEnd?: () => void;
};

export default ITwitterStreamService;
