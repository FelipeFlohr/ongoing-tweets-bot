import { injectable } from "inversify";
import InvalidJsonError from "./errors/invalid_json";

@injectable()
export default abstract class Mapper<T> {
    public async fromJson(val: unknown): Promise<T> {
        if (!this.isRecordStringUnknown(val)) {
            throw new InvalidJsonError(val);
        }
        return await this.fromJsonImpl(val);
    }

    protected abstract fromJsonImpl(val: Record<string, unknown>): Promise<T>;

    private isRecordStringUnknown(val: unknown): val is Record<string, unknown> {
        if (typeof val !== "object") {
            return false;
        }
        if (Array.isArray(val)) {
            return false;
        }
        return true;
    }
}