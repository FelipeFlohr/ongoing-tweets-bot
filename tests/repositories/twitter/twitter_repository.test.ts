import container from "../../../src/config/inversify.config";
import ITwitterRepository from "../../../src/modules/twitter/repositories/twitter_repository";
import TYPES from "../../../src/types/dependency_injection/dependency_injection";

describe("Tests the Twitter Repository", () => {
    const twitterRepository = container.get<ITwitterRepository>(TYPES.TwitterRepository);

    it("should bring a user by username", async () => {
        const user = await twitterRepository.fetchUserByUsername("_2flps");
        expect(user.username).toBe("_2flps");
    });

    it("should bring a user by URL", async () => {
        const user = await twitterRepository.fetchUserByUrl("https://twitter.com/_2flps");
        expect(user.username).toBe("_2flps");
    });

    it("should bring a user by ID", async () => {
        const userBefore = await twitterRepository.fetchUserByUsername("_2flps");
        const id = userBefore.id;

        const user = await twitterRepository.fetchUserById(id);
        expect(user.username).toBe("_2flps");
    });

    it("should bring a message by ID", async () => {
        const tweet = await twitterRepository.fetchTweetById("1614118155345104896");
        expect(tweet.author.username).toBe("elonmusk");
    });
});