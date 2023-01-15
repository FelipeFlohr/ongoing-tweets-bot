import container from "../../../src/config/inversify.config";
import ITwitterHttpGetStream from "../../../src/modules/twitter_stream/services/twtitter_http_get_stream";
import TYPES from "../../../src/types/dependency_injection/dependency_injection";
import sleep from "../../../src/utils/sleep";

jest.setTimeout(15000);

describe("Test the Twitter HTTP Stream Get service", () => {
    it("should close the stream after three second", async () => {
        const twitterHttpGetStream = container.get<ITwitterHttpGetStream>(TYPES.TwitterHttpGetStream);
        let ended = false;

        const stream = await twitterHttpGetStream.getStream({
            path: "/tweets/sample/stream",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onData(_) {
                return;
            },
            onError(error) {
                console.log(`Error: ${error}`);
            },
            onEnd() {
                ended = true;
            },
            onConnect() {
                console.log("Connected");
            },
        });

        await sleep(4000);
        stream.close();
        expect(ended).toBeTruthy();
    });
});