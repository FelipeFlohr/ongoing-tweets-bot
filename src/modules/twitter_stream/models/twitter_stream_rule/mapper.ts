import Mapper from "../../../mapper/models/mapper";
import TwitterStreamRule from "./twitter_stream_rule";

export default class TwitterStreamRuleMapper extends Mapper<TwitterStreamRule> {
    public fromJsonArray(val: unknown): TwitterStreamRule[] {
        const apiVal = val as ApiRuleArrayResponse;
        const result = apiVal.data.map(data => this.apiConverter(data));

        return result;
    }

    protected override async fromJsonImpl(val: Record<string, unknown>): Promise<TwitterStreamRule> {
        const apiVal = val as ApiRuleResponse;
        const result = this.apiConverter(apiVal.data);

        return result;
    }

    private apiConverter(val: ApiRule): TwitterStreamRule {
        const result = new TwitterStreamRule(val.id, val.value, val.tag);
        return result;
    }
}

type ApiRule = {
    readonly id: string
    readonly value: string
    readonly tag?: string
}

type ApiRuleResponse = {
    readonly data: ApiRule
}

type ApiRuleArrayResponse = {
    readonly data: ApiRule[]
}