import { inject, injectable } from "inversify";
import IDiscordService from "../discord_service";
import IDiscordRepository from "../../repositories/discord_repository";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import { TextChannel } from "discord.js";
import DiscordSlashCommand from "../../models/discord_slash_command";

@injectable()
export default class DiscordServiceImpl implements IDiscordService {
    private readonly repository: IDiscordRepository;

    public constructor(@inject(TYPES.DiscordRepository) discordRepository: IDiscordRepository) {
        this.repository = discordRepository;
    }

    public async createCommand(command: DiscordSlashCommand): Promise<void> {
        const guildsOAuth = await this.repository.fetchGuilds();
        const guildFetchPromises = guildsOAuth.map(async guild => await guild.fetch());
        const guilds = await Promise.all(guildFetchPromises);

        const guildCommandCreation = guilds.map(async guild => {
            const buildCommand = command.toDiscordJsBuilder();
            const res = await guild.commands.create(buildCommand);
            return res;
        });
        await Promise.all(guildCommandCreation);
    }

    public async sendMessage(channel: TextChannel, msg: string): Promise<void> {
        await channel.send(msg);
    }
}
