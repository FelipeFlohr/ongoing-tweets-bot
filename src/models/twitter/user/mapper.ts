import { injectable } from "inversify";
import TwitterUser from ".";
import Mapper from "../../mapper/mapper";

@injectable()
export default class TwitterUserMapper extends Mapper<TwitterUser> {
    protected override async fromJsonImpl(val: Record<string, unknown>): Promise<TwitterUser> {
        const apiVal = val as ApiUserResponse;
        const result = new TwitterUser(apiVal.data.id, apiVal.data.name, apiVal.data.username, `https://twitter.com/${apiVal.data.username}`);
        return result;
    }
}

type ApiUserResponse = {
    readonly data: {
        readonly id: string
        readonly name: string
        readonly username: string
    },
    readonly includes?: {
        readonly tweets: {
            readonly text: string,
            readonly created_at: string,
            readonly id: string
        }[]
    }
}