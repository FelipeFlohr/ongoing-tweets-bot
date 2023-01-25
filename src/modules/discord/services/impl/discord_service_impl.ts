import { inject, injectable } from "inversify";
import IDiscordService from "../discord_service";
import IDiscordRepository from "../../repositories/discord_repository";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import { ApplicationCommand, Client, Guild, TextChannel } from "discord.js";
import DiscordSlashCommand from "../../models/discord_slash_command";
import AsyncArray from "../../../../utils/async_array";

@injectable()
export default class DiscordServiceImpl implements IDiscordService {
    private readonly repository: IDiscordRepository;

    public constructor(@inject(TYPES.DiscordRepository) discordRepository: IDiscordRepository) {
        this.repository = discordRepository;
    }

    public async getClient(): Promise<Client<true>> {
        return await this.repository.getClient();
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

    public async getCommands(guild: Guild): Promise<Array<ApplicationCommand<Record<string, never>>>> {
        const commands = await guild.commands.fetch();
        const arrayCommands = commands.map(cmd => cmd);

        return arrayCommands;
    }

    public async getGuilds(): Promise<Guild[]> {
        const guildsOAuth = await this.repository.fetchGuilds();
        const guildArray = guildsOAuth.map(g => g);

        const asyncGuildArray = new AsyncArray(guildArray);
        const guilds = await asyncGuildArray.map(async guild => {
            const res = await guild.fetch();
            return res;
        });
        return guilds;
    }
}
