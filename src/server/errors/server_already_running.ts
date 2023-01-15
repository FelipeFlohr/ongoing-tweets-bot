export default class ServerAlreadyRunningError extends Error {
    public constructor() {
        super("Server is already running.");
    }
}