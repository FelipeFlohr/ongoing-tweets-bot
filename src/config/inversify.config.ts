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
import TwitterHttpGetImpl from "../modules/twitter_http_get/services/services/impl/twitter_http_get_impl";
import ITwitterHttpGet from "../modules/twitter_http_get/services/services/twitter_http_get";

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