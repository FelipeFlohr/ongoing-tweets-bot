export default class TwitterUrls {
    public static getUserByUsername(username: string): string {
        const result = `/users/by/username/${username}`;
        return result;
    }

    public static getUserById(id: string): string {
        const result = `/users/${id}`;
        return result;
    }

    public static getTweetById(id: string): string {
        const result = `/tweets/${id}?tweet.fields=created_at,author_id`;
        return result;
    }

    public static getTweetsBetweenPeriodAndUserId(initialDate: Date | undefined, finalDate: Date, userId: string, maxResults: number) {
        const result = `/users/${userId}/tweets?end_time=${finalDate.toISOString()}&exclude=retweets&expansions=author_id&max_results=${maxResults}${initialDate ? `&start_time=${initialDate.toISOString()}` : ""}&tweet.fields=created_at`;
        return result;
    }
}