export default class TwitterStreamRule {
    public readonly id: string;
    public readonly value: string;
    public readonly tag?: string;

    public constructor(id: string, value: string, tag?: string) {
        this.id = id;
        this.value = value;
        this.tag = tag;
    }
}