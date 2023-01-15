export default class ImpossibleToCreateStreamRuleError extends Error {
    public constructor(ruleVal: string, msg?: unknown) {
        super(`Impossible to create rule. Value: ${ruleVal}. Message: ${msg}`);
    }
}