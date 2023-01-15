interface IEnvironmentSettings {
    readonly app: AppConfig
    readonly twitter: TwitterConfig
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

export default IEnvironmentSettings;