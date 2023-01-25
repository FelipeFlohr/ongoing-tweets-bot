import { inject, injectable } from "inversify";
import log, { LogLevel } from "../../../utils/logger";
import IDiscordService from "../services/discord_service";
import TYPES from "../../../types/dependency_injection/dependency_injection";

@injectable()
export default abstract class IDiscordBot {
    private readonly service: IDiscordService;

    public constructor(@inject(TYPES.DiscordService) discordService: IDiscordService) {
        this.service = discordService;
    }

    public async build(): Promise<void> {
        log("Starting Discord commands setup.", LogLevel.WARN);
        await this.setupDiscordCommands();
        log("Finished Discord command setup", LogLevel.OKAY);

        await this.interactionHandler();
    }

    protected abstract persistDiscordCommands(): Promise<void>;
    protected abstract deleteExistingDiscordCommands(): Promise<void>;

    private async setupDiscordCommands(): Promise<void> {
        log("Deleting existing commands...", LogLevel.WARN);
        await this.deleteExistingDiscordCommands();
        log("Deleted existing commands.", LogLevel.OKAY);

        log("Creating Discord commands...", LogLevel.WARN);
        await this.persistDiscordCommands();
        log("Discord commands created.", LogLevel.OKAY);
    }

    private async interactionHandler(): Promise<void> {
        const client = await this.service.getClient();
        client.on("interactionCreate", async interaction => {
            console.log("interaction created " + interaction);
        });
    }
}