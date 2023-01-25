import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandModel from "../command_model";

export default class RemoveUserListenerCommand extends ICommandModel {
    public constructor(commandName: string) {
        super(commandName);
    }

    public getCommand(): DiscordSlashCommand {
        const res = new DiscordSlashCommand({
            name: this.name,
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