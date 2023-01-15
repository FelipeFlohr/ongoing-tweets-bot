import { CancelTokenSource } from "axios";
import { ETwitterStream } from "../../constants/twitter_stream_events";
import { TwitterTweet } from "../../../twitter/models/tweet";

export default class TwitterStream {
    public readonly stream: NodeJS.ReadableStream;
    private readonly onData: (data: TwitterTweet) => void;
    private readonly onError: (error: unknown) => void;
    private readonly onConnect?: () => void;
    private readonly onDisconnect?: () => void;
    private readonly onEnd?: () => void;
    private readonly cancelToken: CancelTokenSource;

    public constructor(
        stream: NodeJS.ReadableStream,
        cancelToken: CancelTokenSource,
        onData: (data: TwitterTweet) => void,
        onError: (error: unknown) => void,
        onConnect?: () => void,
        onDisconnect?: () => void,
        onEnd?: () => void
    ) {
        this.stream = stream;
        this.cancelToken = cancelToken;
        this.onData = onData;
        this.onError = onError;
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.onEnd = onEnd;

        this.attachFunctionsToStream();
    }

    public close(): void {
        this.cancelToken.cancel();
        if (this.onEnd) {
            this.onEnd();
        }
    }

    private attachFunctionsToStream(): void {
        this.stream.on(ETwitterStream.Data, this.onData);
        this.stream.on(ETwitterStream.Error, this.onError);
        this.stream.on("error", this.onError);
        this.stream.on("connection", () => {
            console.log("conectado");
        });

        if (this.onConnect) {
            this.stream.on(ETwitterStream.Connected, this.onConnect);
        }
        if (this.onDisconnect) {
            this.stream.on(ETwitterStream.Disconnect, this.onDisconnect);
        }
        if (this.onEnd) {
            this.stream.on(ETwitterStream.End, this.onEnd);
        }
    }
}
