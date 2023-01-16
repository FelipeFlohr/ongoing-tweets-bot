import IEnvironmentSettings from "../environment_settings";
import dotenv from "dotenv";
import InvalidEnvNumberError from "../errors/invalid_env_number";
import { injectable } from "inversify";

@injectable()
export default class EnvironmentSettingsImpl implements IEnvironmentSettings {
    public readonly app: { readonly port: number; readonly nodeEnv: "production" | "development"; };
    public readonly twitter: { readonly apiKey: string; readonly apiKeySecret: string; readonly bearerToken: string; readonly accessToken: string; readonly accessTokenSecret: string; };
    public readonly discord: { readonly token: string; };

    public constructor() {
        dotenv.config();

        this.app = {
            port: this.parseEnvInteger(process.env.APP_PORT as string, "APP_PORT"),
            nodeEnv: process.env.NODE_ENV?.toLowerCase() === "development" ? "development" : "production",
        };
        this.twitter = {
            apiKey: process.env.TWITTER_API_KEY as string,
            apiKeySecret: process.env.TWITTER_API_KEY_SECRET as string,
            bearerToken: process.env.TWITTER_BEARER_TOKEN as string,
            accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
        };
        this.discord = {
            token: process.env.DISCORD_TOKEN as string,
        };
    }

    private parseEnvInteger(val: unknown, paramName: string): number {
        if (typeof val !== "number" && typeof val !== "string") throw new InvalidEnvNumberError(paramName, val);

        if (typeof val === "string") {
            const parsedVal = parseInt(val);
            if (isNaN(parsedVal)) {
                throw new InvalidEnvNumberError(paramName, val);
            }

            return parsedVal;
        } else {
            return parseInt(`${val}`);
        }
    }
}