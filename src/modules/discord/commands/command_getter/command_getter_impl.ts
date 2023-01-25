import { injectable } from "inversify";
import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandGetter from "../command_getter";
import commandHolder from "../command_names";

@injectable()
export default class CommandGetterImpl implements ICommandGetter {
    public readonly commands: DiscordSlashCommand[];

    public constructor() {
        this.commands = this.getCommands();
    }

    private getCommands(): DiscordSlashCommand[] {
        const commands = Object.values(commandHolder).map(command => command());
        const res: DiscordSlashCommand[] = commands.map((i) => i.getCommand());

        return res;
    }
}
