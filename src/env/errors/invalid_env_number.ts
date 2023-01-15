import EnvironmentSettingsErrorModel from "./env_error_model";

export default class InvalidEnvNumberError extends EnvironmentSettingsErrorModel {
    public override readonly paramName: string;
    public override readonly val: unknown;

    public constructor(paramName: string, val: unknown) {
        super(`The value ${val} is a invalid number value to the ${paramName} parameter.`);
        this.paramName = paramName;
        this.val = val;
    }
}