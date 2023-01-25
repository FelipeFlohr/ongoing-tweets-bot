import { ApplicationCommand, Client, Guild, TextChannel } from "discord.js";
import DiscordSlashCommand from "../models/discord_slash_command";

interface IDiscordService {
    sendMessage(channel: TextChannel, msg: string): Promise<void>
    createCommand(command: DiscordSlashCommand): Promise<void>
    getCommands(guild: Guild): Promise<Array<ApplicationCommand<Record<string, never>>>>
    getGuilds(): Promise<Array<Guild>>
    getClient(): Promise<Client<true>>
}

export default IDiscordService;