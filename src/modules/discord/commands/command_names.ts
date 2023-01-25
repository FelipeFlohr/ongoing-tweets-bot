import ICommandModel from "./command_model";
import ListenToUserCommand from "./listen_to_user/listen_to_user";
import RemoveListenersCommand from "./remove_listeners/remove_listeners";
import RemoveUserListenerCommand from "./remove_user_listener/remove_user_listener";

type CommandFabric = () => ICommandModel

export type CommandNames = {
    listen: CommandFabric
    removelistener: CommandFabric
    removelisteners: CommandFabric
}

const commandHolder: Readonly<CommandNames> = {
    listen: () => new ListenToUserCommand("listen"),
    removelistener: () => new RemoveUserListenerCommand("removelistener"),
    removelisteners: () => new RemoveListenersCommand("removelisteners")
};

export default commandHolder;
