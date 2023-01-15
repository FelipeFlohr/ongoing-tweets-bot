import axios from "axios";
import { injectable, inject } from "inversify";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import TwitterHttpGetUrls from "../../constants/urls";
import ITwitterHttpGet, { TwitterGetOptions } from "../twitter_http_get";

@injectable()
export default class TwitterHttpGetImpl implements ITwitterHttpGet {
    public readonly environmentSettings: IEnvironmentSettings;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.environmentSettings = environmentSettings;
    }

    public async get<T = unknown>(path: string, options?: TwitterGetOptions | undefined): Promise<T> {
        const parsedPath = path.startsWith("/") ? path : `/${path}`;
        const url = options?.isV2 === true || options?.isV2 === undefined ? `${TwitterHttpGetUrls.twitterBaseV2}${parsedPath}` : `${TwitterHttpGetUrls.twitterBase}${parsedPath}`;

        const authHeader = options?.authentication === true || options?.authentication === undefined ? {
            Authorization: `Bearer ${this.environmentSettings.twitter.bearerToken}`
        } : {};
        const headers = options?.headers !== undefined ? {
            ...options.headers,
            ...authHeader,
        } : authHeader;

        const axiosGet = await axios.get(url, {
            headers: headers,
            responseType: "json"
        });

        return axiosGet.data as T;
    }
}