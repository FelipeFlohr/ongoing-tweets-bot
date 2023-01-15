import axios from "axios";
import { injectable, inject } from "inversify";
import { Stream } from "stream";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ITwitterService from "../twitter_service";

@injectable()
export default class TwitterServiceImpl implements ITwitterService {
    private readonly environmentSettings: IEnvironmentSettings;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.environmentSettings = environmentSettings;
    }

    public async getStream(streamUrl: string): Promise<Stream> {
        const axiosGet = await axios.get(streamUrl, {
            headers: {
                "Authorization": `Bearer ${this.environmentSettings.twitter.bearerToken}`
            },
            timeout: 20000,
            responseType: "stream"
        });
        const data = await axiosGet.data as Stream;
        return data;
    }
}