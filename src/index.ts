import container from "./config/inversify.config";
import IServer from "./server/server";
import TYPES from "./types/dependency_injection/dependency_injection";

const server: IServer = container.get<IServer>(TYPES.Server);
server.runServer();