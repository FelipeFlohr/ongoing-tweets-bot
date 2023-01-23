import DiscordSlashCommand from "../models/discord_slash_command";

interface ICommandGetter {
    readonly commands: DiscordSlashCommand[]
}

export default ICommandGetter;