import { TwitterTweet } from "../../twitter/models/tweet";
import TwitterStream from "../models/twitter_stream/twitter_stream";
import TwitterStreamRule from "../models/twitter_stream_rule/twitter_stream_rule";

interface ITwitterStreamRepository {
    fetchRules(): Promise<TwitterStreamRule[]>
    fetchStream(options: TwitterHttpGetStreamOptions): Promise<TwitterStream>
    removeRuleById(ruleId: string): Promise<void>
    addRule(value: string, tag?: string): Promise<TwitterStreamRule>
}

export type TwitterHttpGetStreamOptions = {
    readonly path: string;
    readonly onData: (data: TwitterTweet) => void;
    readonly onError: (error: unknown) => void;
    readonly onEnd?: () => void;
    readonly onDisconnect?: () => void;
    readonly onConnect?: () => void;
    readonly headers?: Record<string, string>;
    readonly isV2?: boolean;
    readonly withAuth?: boolean;
};

export default ITwitterStreamRepository;