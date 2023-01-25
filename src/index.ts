import container from "./container/inversify.config";
import IDiscordBot from "./modules/discord/bot/discord_bot";
import IServer from "./server/server";
import TYPES from "./types/dependency_injection/dependency_injection";

async function main() {
    const server = await container.getAsync<IServer>(TYPES.Server);
    const bot = await container.getAsync<IDiscordBot>(TYPES.DiscordBot);

    await server.runServer();
    await bot.build();
}

main();