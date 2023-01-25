import DiscordSlashCommand from "../models/discord_slash_command";

// interface ICommandModel {
//     readonly cmdName: string
//     getCommand(): DiscordSlashCommand
// }

// export default ICommandModel;

export default abstract class ICommandModel {
    protected readonly name: string;

    public constructor(commandName: string) {
        this.name = commandName;
    }

    public abstract getCommand(): DiscordSlashCommand;
}