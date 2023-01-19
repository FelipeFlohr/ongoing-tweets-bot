import { TextChannel } from "discord.js";
import DiscordSlashCommand from "../models/discord_slash_command";

interface IDiscordService {
    sendMessage(channel: TextChannel, msg: string): Promise<void>
    createCommand(command: DiscordSlashCommand): Promise<void>
}

export default IDiscordService;