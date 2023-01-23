import { injectable } from "inversify";
import DiscordSlashCommand from "../../models/discord_slash_command";
import ICommandGetter from "../command_getter";
import ListenToUserCommand from "../listen_to_user/listen_to_user";
import RemoveUserListenerCommand from "../remove_user_listener/remove_user_listener";
import RemoveListenersCommand from "../remove_listeners/remove_listeners";

@injectable()
export default class CommandGetterImpl implements ICommandGetter {
    public readonly commands: DiscordSlashCommand[];

    public constructor() {
        this.commands = this.getCommands();
    }

    private getCommands(): DiscordSlashCommand[] {
        const listenToUser = new ListenToUserCommand();
        const removeListener = new RemoveUserListenerCommand();
        const removeListeners = new RemoveListenersCommand();

        const res: DiscordSlashCommand[] = [
            listenToUser,
            removeListener,
            removeListeners,
        ].map((i) => i.getCommand());

        return res;
    }
}
