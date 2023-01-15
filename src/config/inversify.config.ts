import "reflect-metadata";

import { Container } from "inversify";
import IEnvironmentSettings from "../env/environment_settings";
import TYPES from "../types/dependency_injection/dependency_injection";
import EnvironmentSettingsImpl from "../env/impl/environment_settings_impl";
import IServer from "../server/server";
import ServerImpl from "../server/impl/server_impl";
import ITwitterService from "../services/twitter/twitter_service";
import TwitterServiceImpl from "../services/twitter/impl/twitter_service_impl";

const container = new Container({
    defaultScope: "Request"
});

// Bindings
container.bind<IEnvironmentSettings>(TYPES.EnvironmentSettings).to(EnvironmentSettingsImpl).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(ServerImpl).inSingletonScope();
container.bind<ITwitterService>(TYPES.TwitterService).to(TwitterServiceImpl).inSingletonScope();

export default container;