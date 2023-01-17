interface IEnvironmentSettings {
    readonly app: AppConfig
    readonly twitter: TwitterConfig
    readonly discord: DiscordConfig
}

type AppConfig = {
    readonly port: number
    readonly nodeEnv: "production" | "development"
}

type TwitterConfig = {
    readonly apiKey: string
    readonly apiKeySecret: string
    readonly bearerToken: string
    readonly accessToken: string
    readonly accessTokenSecret: string
}

type DiscordConfig = {
    readonly token: string
    readonly guildFetchMaxAmount: number
}

export default IEnvironmentSettings;