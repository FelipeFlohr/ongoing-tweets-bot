import container from "../../../../src/config/inversify.config";
import ITwitterRepository from "../../../../src/modules/twitter/repositories/twitter_repository";
import TYPES from "../../../../src/types/dependency_injection/dependency_injection";

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

    it("should bring the last twenty tweets", async () => {
        const tweets = await twitterRepository.fetchTweetsByPeriodAndUsername({
            finalDate: new Date(),
            username: "VascodaGama",
            maxAmount: 20
        });
        expect(tweets.length).toBe(20);
    });

    it("should bring the tweets by period", async () => {
        const tweets = await twitterRepository.fetchTweetsByPeriodAndUsername({
            initialDate: new Date("2023-01-15T12:00:00.627Z"),
            finalDate: new Date("2023-01-15T16:00:00.627Z"),
            username: "VascodaGama",
            maxAmount: 100
        });

        expect(tweets.length).toBe(3);
    });
});