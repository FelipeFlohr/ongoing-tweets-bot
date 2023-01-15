export default abstract class EnvironmentSettingsErrorModel extends Error {
    public abstract readonly paramName: string
    public abstract readonly val: unknown
}