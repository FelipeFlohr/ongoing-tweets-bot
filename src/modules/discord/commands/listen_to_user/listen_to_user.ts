import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandModel from "../command_model";

export default class ListenToUserCommand extends ICommandModel {
    public constructor(commandName: string) {
        super(commandName);
    }

    public getCommand(): DiscordSlashCommand {
        const res = new DiscordSlashCommand({
            name: this.name,
            description: "Listen to a Twitter user",
            options: [
                {
                    name: "username",
                    description: "Username of the user to listen to Twitter updates.",
                    required: true,
                    type: "string"
                },
                {
                    name: "channel",
                    description: "Channel to send the updates. If none is provided, then this current channel will be the one.",
                    required: false,
                    type: "channel"
                }
            ]
        });

        return res;
    }
}