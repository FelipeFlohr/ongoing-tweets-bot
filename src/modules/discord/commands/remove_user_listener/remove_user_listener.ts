import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandModel from "../command_model";

export default class RemoveUserListenerCommand implements ICommandModel {
    public readonly cmdName: string;

    public constructor() {
        this.cmdName = "removelistener";
    }

    public getCommand(): DiscordSlashCommand {
        const res = new DiscordSlashCommand({
            name: this.cmdName,
            description: "Remove a user listener, if exists.",
            options: [
                {
                    name: "username",
                    description: "Username of the user of which the listener will be removed.",
                    required: true,
                    type: "string"
                }
            ]
        });

        return res;
    }
}