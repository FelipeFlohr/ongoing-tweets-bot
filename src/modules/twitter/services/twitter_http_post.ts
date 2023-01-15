interface ITwitterHttpPost {
    post<T = unknown>(path: string, body?: Record<string, unknown>, options?: TwitterPostOptions): Promise<T>
}

export type TwitterPostOptions = {
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

export default ITwitterHttpPost;