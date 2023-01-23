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

    public async map<U>(callback: (value: T, index: number, array: T[]) => U, parallel = true): Promise<Array<U>> {
        const res: U[] = [];
        if (parallel) {
            const promises = this.array.map(async (item, index) => {
                const result = await callback(item, index, this.array);
                res.push(result);
            });
            await Promise.all(promises);
            return res;
        }

        for (let i = 0; i < this.array.length; i++) {
            const item = this.array[i];
            const result = await callback(item, i, this.array);
            res.push(result);
        }

        return res;
    }
}