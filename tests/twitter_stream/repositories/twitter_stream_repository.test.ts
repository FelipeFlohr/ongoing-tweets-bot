/* eslint-disable @typescript-eslint/no-unused-vars */
import container from "../../../src/container/inversify.config";
import ITwitterStreamRepository from "../../../src/modules/twitter_stream/repositories/twitter_stream_repository";
import TYPES from "../../../src/types/dependency_injection/dependency_injection";
import sleep from "../../../src/utils/sleep";

describe("Tests the Twitter Stream Repository", () => {
    it("should close a stream", async () => {
        const sampleUrl = "/tweets/sample/stream";
        let ended = false;

        const repository = container.get<ITwitterStreamRepository>(TYPES.TwitterStreamRepository);
        const stream = await repository.fetchStream({
            onData(data) {
                return;
            },
            onError(error) {
                return;
            },
            onEnd() {
                ended = true;
            },
            onDisconnect() {
                return;
            },
            path: sampleUrl,
        });

        await sleep(2000);
        stream.close();
        expect(ended).toBe(true);
    });
});