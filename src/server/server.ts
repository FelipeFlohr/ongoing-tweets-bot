/* eslint-disable @typescript-eslint/ban-types */
import { ExpressServer } from "./types/express_server";

interface IServer {
    addController(controller: Function | string): IServer;
    runServer(): Promise<ExpressServer>
}

export default IServer;