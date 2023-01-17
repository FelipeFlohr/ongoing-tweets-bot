import { TextChannel } from "discord.js";

interface IDiscordService {
    sendMessage(channel: TextChannel, msg: string): Promise<void>
    createCommand(): Promise<void>
}

export default IDiscordService;