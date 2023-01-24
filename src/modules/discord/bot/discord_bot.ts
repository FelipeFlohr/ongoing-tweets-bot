import { injectable } from "inversify";
import log, { LogLevel } from "../../../utils/logger";

@injectable()
export default abstract class IDiscordBot {
    public async build(): Promise<void> {
        log("Starting Discord commands setup.", LogLevel.WARN);
        await this.setupDiscordCommands();
        log("Finished Discord command setup", LogLevel.OKAY);
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
}