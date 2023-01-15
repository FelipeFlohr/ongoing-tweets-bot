import "reflect-metadata";

import { Container } from "inversify";
import IEnvironmentSettings from "../env/environment_settings";
import TYPES from "../types/dependency_injection/dependency_injection";
import EnvironmentSettingsImpl from "../env/impl/environment_settings_impl";
import IServer from "../server/server";
import ServerImpl from "../server/impl/server_impl";
import ITwitterService from "../services/twitter/twitter_service";
import TwitterServiceImpl from "../services/twitter/impl/twitter_service_impl";
import ITwitterRepository from "../repositories/twitter/twitter_repository";
import TwitterRepositoryImpl from "../repositories/twitter/impl/twitter_repository_impl";
import ITwitterHttpGet from "../services/twitter_http_get/services/twitter_http_get";
import TwitterHttpGetImpl from "../services/twitter_http_get/services/impl/twitter_http_get_impl";
import TwitterTweetMapper from "../models/twitter/tweet/mapper";
import TwitterUserMapper from "../models/twitter/user/mapper";

const container = new Container({
    defaultScope: "Request"
});

// Bindings
container.bind<IEnvironmentSettings>(TYPES.EnvironmentSettings).to(EnvironmentSettingsImpl).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ServerImpl).inSingletonScope();
container.bind<ITwitterService>(TYPES.TwitterService).to(TwitterServiceImpl).inSingletonScope();
container.bind<ITwitterRepository>(TYPES.TwitterRepository).to(TwitterRepositoryImpl).inSingletonScope();
container.bind<ITwitterHttpGet>(TYPES.TwitterHttpGet).to(TwitterHttpGetImpl).inRequestScope();
container.bind<TwitterTweetMapper>(TYPES.TwitterTweetMapper).to(TwitterTweetMapper).inRequestScope();
container.bind<TwitterUserMapper>(TYPES.TwitterUserMapper).to(TwitterUserMapper).inRequestScope();

export default container;