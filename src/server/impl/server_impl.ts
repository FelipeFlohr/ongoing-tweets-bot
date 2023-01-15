/* eslint-disable @typescript-eslint/ban-types */
import IServer from "../server";
import IEnvironmentSettings from "../../env/environment_settings";
import { inject, injectable } from "inversify";
import TYPES from "../../types/dependency_injection/dependency_injection";
import ServerAlreadyRunningError from "../errors/server_already_running";
import { ExpressServer } from "../types/express_server";
import express from "express";
import log, { LogLevel } from "../../utils/logger";

@injectable()
export default class ServerImpl implements IServer {
    private readonly environmentSettings: IEnvironmentSettings;
    private readonly controllers: Array<Function | string>;
    private isRunning: boolean;

    public constructor(@inject(TYPES.EnvironmentSettings) environmentSettings: IEnvironmentSettings) {
        this.environmentSettings = environmentSettings;
        this.controllers = [];
        this.isRunning = false;
    }

    public addController(controller: string | Function): IServer {
        this.controllers.push(controller);
        return this;
    }

    public async runServer(): Promise<ExpressServer> {
        if (this.isRunning) {
            throw new ServerAlreadyRunningError();
        }

        const res = await this.promisifyServerCreation();
        this.isRunning = true;
        return res;
    }

    private promisifyServerCreation(): Promise<ExpressServer> {
        const app = express();
        return new Promise<ExpressServer>((res, rej) => {
            try {
                const server = app.listen(this.environmentSettings.app.port, (() => {
                    log(`Server up and running at port ${this.environmentSettings.app.port}`, LogLevel.OKAY);
                    res({
                        app: app,
                        server: server
                    });
                }));
            } catch (err) {
                log(`Impossible to create server. Reason: ${err}`, LogLevel.FATAL);
                rej(err);
            }
        });
    }
}