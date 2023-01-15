export default class ImpossibleToDeleteStreamRuleError extends Error {
    public constructor(ruleId: string, msg?: unknown) {
        super(`Impossible to delete rule ${ruleId}: ${msg}`);
    }
}