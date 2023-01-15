import { inject, injectable } from "inversify";
import ITwitterHttpPost, { TwitterPostOptions } from "../twitter_http_post";
import TwitterHttpGetUrls from "../../constants/urls";
import axios from "axios";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";

@injectable()
export default class TwitterHttpPostImpl implements ITwitterHttpPost {
    private readonly environmentSettings: IEnvironmentSettings;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.environmentSettings = environmentSettings;
    }

    public async post<T = unknown>(path: string, body?: Record<string, unknown> | undefined, options?: TwitterPostOptions | undefined): Promise<T> {
        const parsedPath = path.startsWith("/") ? path : `/${path}`;
        const url = options?.isV2 === true || options?.isV2 === undefined ? `${TwitterHttpGetUrls.twitterBaseV2}${parsedPath}` : `${TwitterHttpGetUrls.twitterBase}${parsedPath}`;

        const authHeader = options?.authentication === true || options?.authentication === undefined ? {
            Authorization: `Bearer ${this.environmentSettings.twitter.bearerToken}`
        } : {};
        const headers = options?.headers !== undefined ? {
            ...options.headers,
            ...authHeader,
        } : authHeader;

        const axiosPost = await axios.post(url, body, {
            headers: headers,
            responseType: "json",
        });

        return axiosPost.data as T;
    }
}