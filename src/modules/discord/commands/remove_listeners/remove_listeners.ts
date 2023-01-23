import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandModel from "../command_model";

export default class RemoveListenersCommand implements ICommandModel {
    public readonly cmdName: string;

    public constructor() {
        this.cmdName = "removelisteners";
    }

    public getCommand(): DiscordSlashCommand {
        const res = new DiscordSlashCommand({
            name: this.cmdName,
            description: "Remove all the listeners",
        });

        return res;
    }
}