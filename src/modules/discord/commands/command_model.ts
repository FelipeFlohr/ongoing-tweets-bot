import DiscordSlashCommand from "../models/discord_slash_command";

interface ICommandModel {
    readonly cmdName: string
    getCommand(): DiscordSlashCommand
}

export default ICommandModel;