export default class AsyncArray<T> {
    private readonly array: Array<T>;

    public constructor(array: Array<T>) {
        this.array = array;
    }

    public async forEach(callback: (value: T, index: number, array: T[]) => Promise<void>, parallel = true) {
        if (parallel) {
            const promises = this.array.map(async (item, index) => {
                return await callback(item, index, this.array);
            });
            await Promise.all(promises);
        } else {
            for (let i = 0; i < this.array.length; i++) {
                const item = this.array[i];
                await callback(item, i, this.array);
            }
        }
    }

    public async map<U>(
        callbackfn: (i: T) => Promise<U>,
        parallel = true
    ): Promise<U[]> {
        if (parallel) {
            const promises = this.array.map(callbackfn);
            return await Promise.all(promises);
        }
        const resArray: U[] = [];
        for (const i of this.array) {
            const res = await callbackfn(i);
            resArray.push(res);
        }

        return resArray;
    }
}