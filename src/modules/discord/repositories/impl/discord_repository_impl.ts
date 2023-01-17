import { CacheType, Client, Collection, Interaction, OAuth2Guild } from "discord.js";
import IDiscordRepository, { GuildFetchOptions } from "../discord_repository";
import { inject, injectable } from "inversify";
import IEnvironmentSettings from "../../../../env/environment_settings";
import TYPES from "../../../../types/dependency_injection/dependency_injection";

@injectable()
export default class DiscordRepositoryImpl implements IDiscordRepository {
    private readyClient?: Client<true>;
    private readonly client: Client<boolean>;
    private readonly environmentSettings: IEnvironmentSettings;
    private readonly interactionCallbacks: Array<(interaction: Interaction<CacheType>) => void | Promise<void>>;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.client = new Client({
            intents: ["Guilds", "GuildMessages", "GuildVoiceStates"]
        });
        this.environmentSettings = environmentSettings;
        this.interactionCallbacks = [];
    }
    
    public async getClient(): Promise<Client<true>> {
        if (this.readyClient) {
            return this.readyClient;
        }
        
        await this.login();
        return await this.promisifyClientReady();
    }

    public async fetchGuilds(options?: GuildFetchOptions | undefined): Promise<Collection<string, OAuth2Guild>> {
        const client = await this.getClient();
        const guilds = await client.guilds.fetch({
            limit: options?.maxAmount ? options.maxAmount : this.environmentSettings.discord.guildFetchMaxAmount
        });

        return guilds;
    }
    
    public async addInteractionCallback(cb: (interaction: Interaction<CacheType>) => void | Promise<void>): Promise<void> {
        this.interactionCallbacks.push(cb);
        const client = await this.getClient();

        client.removeAllListeners("interactionCreate");
        client.on("interactionCreate", (interaction) => {
            for (const cb of this.interactionCallbacks) {
                cb(interaction);
            }
        });
    }

    private async login(): Promise<void> {
        await this.client.login(this.environmentSettings.discord.token);
    }


    private promisifyClientReady(): Promise<Client<true>> {
        return new Promise<Client<true>>((res) => {
            this.client.on("ready", client => {
                res(client);
            });
        });
    }
}