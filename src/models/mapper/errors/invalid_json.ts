export default class InvalidJsonError extends Error {
    public constructor(val: unknown) {
        super(`The value ${val} is not a valid JSON`);
    }
}