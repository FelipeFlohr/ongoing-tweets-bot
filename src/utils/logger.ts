export default function log(msg: unknown, level = LogLevel.INFO) {
    const date = new Date();
    const formatted = `${level} | ${getDateString(date)} | ${msg}`;

    if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
        console.error(formatted);
    } else if (level === LogLevel.WARN) {
        console.warn(formatted);
    } else {
        console.log(formatted);
    }
}

function getDateString(date: Date): string {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds().toString();

    const formatted = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formatted;
}

export enum LogLevel {
    OKAY = "OKAY",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}