import container from "../../../src/config/inversify.config";
import { ETwitterStream } from "../../../src/modules/twitter/services/constants/twitter_stream_events";
import ITwitterService from "../../../src/modules/twitter/services/twitter_service";
import TYPES from "../../../src/types/dependency_injection/dependency_injection";

describe("Tests the Twitter Service", () => {
    const twitterService = container.get<ITwitterService>(TYPES.TwitterService);

    it("should return the Twitter sample stream", (done) => {
        const streamSample = "https://api.twitter.com/2/tweets/sample/stream";
        twitterService.getStream(streamSample)
            .then(stream => {
                stream.on(ETwitterStream.Data, (data) => {
                    expect.any(data);
                    stream.removeAllListeners();
                    done();
                });
            });
    });
});
