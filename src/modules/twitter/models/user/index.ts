export default class TwitterUser {
    public readonly id: string;
    public readonly name: string;
    public readonly username: string;
    public readonly url: string;

    public constructor(id: string | number, name: string, username: string, url: string) {
        this.id = typeof id === "number" ? id.toString() : id;
        this.name = name;
        this.username= username;
        this.url = url;
    }
}