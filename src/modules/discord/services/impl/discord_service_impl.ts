import { inject, injectable } from "inversify";
import IDiscordService from "../discord_service";
import { Client } from "discord.js";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";

@injectable()
export default class DiscordServiceImpl implements IDiscordService {
    public readonly client: Client<boolean>;
    private readonly environmentSettings: IEnvironmentSettings;
    private isLoggedIn: boolean;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.environmentSettings = environmentSettings;
        this.client = new Client({
            intents: ["Guilds", "GuildMessages", "GuildVoiceStates"],
        });
        this.isLoggedIn = false;
    }

    private async getLoggedClient(): Promise<Client<true>> {
        if (this.isLoggedIn) {
            return this.client;
        }

        await this.client.login(this.environmentSettings.discord.token);
        const client = await this.promisifyClientReady();
        return client;
    }

    private promisifyClientReady(): Promise<Client<true>> {
        return new Promise<Client<true>>((res) => {
            this.client.on("ready", client => {
                res(client);
            });
        });
    }
}
