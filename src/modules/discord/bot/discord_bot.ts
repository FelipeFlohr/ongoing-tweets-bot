export default abstract class IDiscordBot {
    public async build(): Promise<void> {
        await this.setupDiscordCommands();
    }

    protected abstract persistDiscordCommands(): Promise<void>;
    protected abstract deleteExistingDiscordCommands(): Promise<void>;

    private async setupDiscordCommands(): Promise<void> {
        await this.deleteExistingDiscordCommands();
        await this.persistDiscordCommands();
    }
}