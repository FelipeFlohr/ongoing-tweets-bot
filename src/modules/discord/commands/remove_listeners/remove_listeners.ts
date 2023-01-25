import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandModel from "../command_model";

export default class RemoveListenersCommand extends ICommandModel {
    public constructor(commandName: string) {
        super(commandName);
    }

    public getCommand(): DiscordSlashCommand {
        const res = new DiscordSlashCommand({
            name: this.name,
            description: "Remove all the listeners",
        });

        return res;
    }
}