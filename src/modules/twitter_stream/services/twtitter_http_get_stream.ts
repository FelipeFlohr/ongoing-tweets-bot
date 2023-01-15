import TwitterStream from "../models/twitter_stream";

interface ITwitterHttpGetStream {
    getStream(options: TwitterHttpGetStreamOptions): Promise<TwitterStream>
}

export type TwitterHttpGetStreamOptions = {
    readonly path: string
    readonly onData: (data: unknown) => void
    readonly onError: (error: unknown) => void
    readonly onEnd?: () => void
    readonly onDisconnect?: () => void
    readonly onConnect?: () => void
    readonly headers?: Record<string, string>
    readonly isV2?: boolean
    readonly withAuth?: boolean
}

export default ITwitterHttpGetStream;
