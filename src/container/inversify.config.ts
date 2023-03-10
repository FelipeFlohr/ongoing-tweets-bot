import "reflect-metadata";

import { Container } from "inversify";
import IEnvironmentSettings from "../env/environment_settings";
import TYPES from "../types/dependency_injection/dependency_injection";
import EnvironmentSettingsImpl from "../env/impl/environment_settings_impl";
import IServer from "../server/server";
import ServerImpl from "../server/impl/server_impl";
import TwitterTweetMapper from "../modules/twitter/models/tweet/mapper";
import TwitterUserMapper from "../modules/twitter/models/user/mapper";
import TwitterRepositoryImpl from "../modules/twitter/repositories/impl/twitter_repository_impl";
import ITwitterRepository from "../modules/twitter/repositories/twitter_repository";
import TwitterServiceImpl from "../modules/twitter/services/impl/twitter_service_impl";
import ITwitterService from "../modules/twitter/services/twitter_service";
import TwitterHttpGetImpl from "../modules/twitter/services/impl/twitter_http_get_impl";
import ITwitterHttpGet from "../modules/twitter/services/twitter_http_get";
import ITwitterStreamService from "../modules/twitter_stream/services/twitter_stream_service";
import TwitterStreamRepositoryImpl from "../modules/twitter_stream/repositories/impl/twitter_stream_repository_impl";
import ITwitterStreamRepository from "../modules/twitter_stream/repositories/twitter_stream_repository";
import TwitterStreamServiceImpl from "../modules/twitter_stream/services/impl/twitter_stream_service_impl";
import ITwitterHttpPost from "../modules/twitter/services/twitter_http_post";
import TwitterHttpPostImpl from "../modules/twitter/services/impl/twitter_http_post_impl";
import IDiscordService from "../modules/discord/services/discord_service";
import DiscordServiceImpl from "../modules/discord/services/impl/discord_service_impl";
import IDiscordRepository from "../modules/discord/repositories/discord_repository";
import DiscordRepositoryImpl from "../modules/discord/repositories/impl/discord_repository_impl";
import IPrismaService from "../modules/database/services/prisma_service";
import PrismaServiceImpl from "../modules/database/services/impl/prisma_service_impl";
import IDatabaseRepository from "../modules/database/repositories/database_repository";
import DatabaseRepositoryImpl from "../modules/database/repositories/impl/database_repository_impl";
import IDatabaseService from "../modules/database/services/database_service";
import DatabaseServiceImpl from "../modules/database/services/impl/database_service_impl";
import ICommandGetter from "../modules/discord/commands/command_getter";
import CommandGetterImpl from "../modules/discord/commands/command_getter/command_getter_impl";
import IDiscordBot from "../modules/discord/bot/discord_bot";
import DiscordBotImpl from "../modules/discord/bot/impl/discord_bot_impl";

const container = new Container({
    defaultScope: "Request"
});

// Bindings
container.bind<IEnvironmentSettings>(TYPES.EnvironmentSettings).to(EnvironmentSettingsImpl).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ServerImpl).inSingletonScope();

container.bind<ITwitterService>(TYPES.TwitterService).to(TwitterServiceImpl).inSingletonScope();
container.bind<ITwitterRepository>(TYPES.TwitterRepository).to(TwitterRepositoryImpl).inSingletonScope();
container.bind<ITwitterHttpGet>(TYPES.TwitterHttpGet).to(TwitterHttpGetImpl).inRequestScope();
container.bind<ITwitterHttpPost>(TYPES.TwitterHttpPost).to(TwitterHttpPostImpl).inRequestScope();
container.bind<TwitterTweetMapper>(TYPES.TwitterTweetMapper).to(TwitterTweetMapper).inRequestScope();
container.bind<TwitterUserMapper>(TYPES.TwitterUserMapper).to(TwitterUserMapper).inRequestScope();

container.bind<ITwitterStreamService>(TYPES.TwitterStreamService).to(TwitterStreamServiceImpl).inRequestScope();
container.bind<ITwitterStreamRepository>(TYPES.TwitterStreamRepository).to(TwitterStreamRepositoryImpl).inSingletonScope();

container.bind<IDiscordRepository>(TYPES.DiscordRepository).to(DiscordRepositoryImpl).inSingletonScope();
container.bind<IDiscordService>(TYPES.DiscordService).to(DiscordServiceImpl).inSingletonScope();
container.bind<IDiscordBot>(TYPES.DiscordBot).to(DiscordBotImpl).inSingletonScope();

container.bind<IPrismaService>(TYPES.PrismaService).to(PrismaServiceImpl).inSingletonScope();

container.bind<IDatabaseRepository>(TYPES.DatabaseRepository).to(DatabaseRepositoryImpl).inSingletonScope();
container.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope();

container.bind<ICommandGetter>(TYPES.CommandGetter).to(CommandGetterImpl).inSingletonScope();

export default container;