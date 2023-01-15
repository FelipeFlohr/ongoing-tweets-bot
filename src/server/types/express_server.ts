import { Express } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";

export type ExpressServer = {
    readonly app: Express;
    readonly server: Server<typeof IncomingMessage, typeof ServerResponse>
}