const TYPES = {
    EnvironmentSettings: Symbol("IEnvironmentSettings"),
    Server: Symbol("IServer"),
    TwitterService: Symbol("ITwitterService"),
    TwitterRepository: Symbol("ITwitterRepository"),
    TwitterHttpGet: Symbol("ITwitterHttpGet"),
    TwitterTweetMapper: Symbol("TwitterTweetMapper"),
    TwitterUserMapper: Symbol("TwitterUserMapper"),
    TwitterStreamService: Symbol("ITwitterStreamService"),
    TwitterStreamRepository: Symbol("ITwitterStreamRepository"),
    TwitterHttpPost: Symbol("ITwitterHttpPost"),
    DiscordService: Symbol("IDiscordService"),
    DiscordRepository: Symbol("IDiscordRepository"),
    PrismaService: Symbol("IPrismaService"),
    DatabaseRepository: Symbol("IDatabaseRepository"),
    DatabaseService: Symbol("IDatabaseService"),
};

export default TYPES;