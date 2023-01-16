import { Client } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDiscordService {
    readonly client: Client;
}

export default IDiscordService;