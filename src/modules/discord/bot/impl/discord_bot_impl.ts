import { inject, injectable } from "inversify";
import IDiscordBot from "../discord_bot";
import IDiscordService from "../../services/discord_service";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ICommandGetter from "../../commands/command_getter";
import AsyncArray from "../../../../utils/async_array";

@injectable()
export default class DiscordBotImpl extends IDiscordBot {
    private readonly discordService: IDiscordService;
    private readonly commandGetter: ICommandGetter;

    public constructor(
        @inject(TYPES.DiscordService) discordService: IDiscordService,
        @inject(TYPES.CommandGetter) commandGetter: ICommandGetter
    ) {
        super(discordService);
        this.discordService = discordService;
        this.commandGetter = commandGetter;
    }

    protected override async persistDiscordCommands(): Promise<void> {
        const asyncArray = new AsyncArray(this.commandGetter.commands);
        await asyncArray.forEach(async (command) => {
            await this.discordService.createCommand(command);
        });
    }

    protected override async deleteExistingDiscordCommands(): Promise<void> {
        const guilds = await this.discordService.getGuilds();
        const asyncGuildArray = new AsyncArray(guilds);
        await asyncGuildArray.forEach(async guild => {
            const commands = await this.discordService.getCommands(guild);
            const asyncCommandArray = new AsyncArray(commands);

            await asyncCommandArray.forEach(async command => {
                await command.delete();
            });
        });
    }
}
