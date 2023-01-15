interface ITwitterHttpGet {
    get<T = unknown>(path: string, options?: TwitterGetOptions): Promise<T>
}

export type TwitterGetOptions = {
    /**
     * @default {}
     */
    readonly headers?: Record<string, string>
    /**
     * @default true
     */
    readonly authentication?: boolean
    /**
     * @default true
     */
    readonly isV2?: boolean
}

export default ITwitterHttpGet;