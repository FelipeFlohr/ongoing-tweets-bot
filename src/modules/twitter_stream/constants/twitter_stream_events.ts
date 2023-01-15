export enum ETwitterStream {
    End = "end",
    Connected = "connected",
    ConnectError = "connect error",
    ConnectionError = "connection error",
    ConnectionClosed = "connection closed",
    Disconnect = "disconnect",
    ConnectionLost = "connection lost",
    ReconnectAttempt = "reconnect attempt",
    Reconnected = "reconnected",
    ReconnectError = "reconnect error",
    ReconnectLimitExceeded = "reconnect limit exceeded",
    DataKeepAlive = "data keep-alive",
    Data = "data",
    DataError = "data twitter error",
    TweetParseError = "data tweet parse error",
    Error = "err"
}