import { SlashCommandBuilder } from "discord.js";

export default class DiscordSlashCommand {
    private readonly options: DiscordSlashCommandOptions;

    public constructor(options: DiscordSlashCommandOptions) {
        this.options = options;
    }

    public toDiscordJsBuilder(): SlashCommandBuilder {
        const command = new SlashCommandBuilder()
            .setName(this.options.name)
            .setDescription(this.options.description);

        for (const option of this.options.options) {
            switch (option.type) {
            case "boolean":
                command.addBooleanOption((cmdOption) => {
                    return cmdOption
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required);
                });
                break;
            case "channel":
                command.addChannelOption((cmdOption) => {
                    return cmdOption
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required);
                });
                break;
            case "integer":
                command.addIntegerOption((cmdOption) => {
                    return cmdOption
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required);
                });
                break;
            case "number":
                command.addNumberOption((cmdOption) => {
                    return cmdOption
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required);
                });
                break;
            case "string":
                command.addStringOption((cmdOption) => {
                    return cmdOption
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required);
                });
                break;
            }
        }

        return command;
    }
}

export type DiscordSlashCommandOptions = {
    readonly name: string;
    readonly description: string;
    readonly options: SlashCommandOption[];
};

export type SlashCommandOption = {
    readonly name: string;
    readonly description: string;
    readonly type: "string" | "integer" | "number" | "channel" | "boolean";
    readonly required: boolean;
};
