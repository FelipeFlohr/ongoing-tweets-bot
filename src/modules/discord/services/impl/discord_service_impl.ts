import { inject, injectable } from "inversify";
import IDiscordService from "../discord_service";
import IDiscordRepository from "../../repositories/discord_repository";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import IEnvironmentSettings from "../../../../env/environment_settings";
import { SlashCommandBuilder, TextChannel } from "discord.js";

@injectable()
export default class DiscordServiceImpl implements IDiscordService {
    private readonly repository: IDiscordRepository;
    private readonly environmentSettings: IEnvironmentSettings;

    public constructor(@inject(TYPES.DiscordRepository) discordRepository: IDiscordRepository, @inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.repository = discordRepository;
        this.environmentSettings = environmentSettings;
    }

    public async createCommand(): Promise<void> {
        const guildsOAuth = await this.repository.fetchGuilds();
        const guildFetchPromises = guildsOAuth.map(async guild => await guild.fetch());
        const guilds = await Promise.all(guildFetchPromises);

        const guildCommandCreation = guilds.map(async guild => {
            await guild.commands.create(new SlashCommandBuilder());
        });
        await Promise.all(guildCommandCreation);
    }

    public async sendMessage(channel: TextChannel, msg: string): Promise<void> {
        await channel.send(msg);
    }
}
