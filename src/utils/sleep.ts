export default function sleep(ms: number): Promise<void> {
    return new Promise<void>(res => {
        const timeout = setTimeout(() => {
            res();
            clearTimeout(timeout);
        }, ms);
    });
}