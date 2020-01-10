export class PriorityQueue<T> {
    private _items = new Array<T>();
    constructor(private _comparator: (x: T, y: T) => number) { }
    clear() {
        this._items = new Array<T>();
    }
    push(item: T) {
        const index = this._items.findIndex(existing => this._comparator(item, existing) <= 0);
        if (index === -1) {
            this._items.push(item);
        } else {
            this._items.splice(index, 0, item);
        }
    }
    pop(): T | undefined {
        if (this._items.length === 0) {
            return undefined;
        }
        return this._items.splice(0, 1)[0];
    }
    peek(): T | undefined {
        if (this._items.length === 0) {
            return undefined;
        }
        return this._items[0];
    }
    get size(): number {
        return this._items.length;
    }
    toArray(): Array<T> {
        return this._items.slice();
    }
}
