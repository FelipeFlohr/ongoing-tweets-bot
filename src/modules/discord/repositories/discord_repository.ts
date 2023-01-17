import { CacheType, Client, Collection, Interaction, OAuth2Guild } from "discord.js";

interface IDiscordRepository {
    getClient(): Promise<Client<true>>
    addInteractionCallback(cb: (interaction: Interaction<CacheType>) => void | Promise<void>): Promise<void>
    fetchGuilds(options?: GuildFetchOptions): Promise<Collection<string, OAuth2Guild>>
}

export type GuildFetchOptions = {
    /**
     * If no value is provided, then
     * it's going to use the one
     * provided in the environment
     * variables
     */
    readonly maxAmount?: number
}

export default IDiscordRepository;