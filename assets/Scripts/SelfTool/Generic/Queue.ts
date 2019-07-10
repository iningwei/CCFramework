interface IQueue<T> {
    /**
     * 返回队顶对象，但不移除
     */
    Peek(): T;
    /**
     * 入队
     * @param item 
     */
    Enqueue(item: T):void;
    /**
     * 返回队顶对象，并删除
     */
    Dequeue(): T;
    Contains(item: T): boolean;
    Empty(): boolean;
    Count(): number;
    Clear():void;
}


class Item<T>{
    private value: T;
    private before: Item<T>;
    private next: Item<T>;
    constructor(private _value: T, private _before: Item<T> = null, private _next: Item<T> = null) {
        this.value = _value;
        this.before = _before;
        this.next = _next;
    }

    set Value(value: T) {
        this.value = value;
    }
    get Value(): T {
        return this.value;
    }

    set Before(value: Item<T>) {
        this.before = value;
    }
    get Before(): Item<T> {
        return this.before;
    }

    set Next(value: Item<T>) {
        this.next = value;
    }
    get Next(): Item<T> {
        return this.next;
    }
}



/**
 * 泛型实现的队列结构，先进先出FIFO
 */
export default class Queue<T> implements IQueue<T> {
    private header: Item<T>;//指向队头
    private trail: Item<T>;//指向队尾

    private count: number = 0;
    constructor() {
        this.header = new Item<T>(null);
        this.trail = new Item<T>(null);

        this.header.Next = this.trail;
        this.trail.Before = this.header;
    }


    Peek(): T {
        if (this.count == 0) {
            return null;
        }
        return this.header.Next.Value;
    }
    Enqueue(item: T) {
        let newItem = new Item<T>(item);

        let lastItem = this.trail.Before;
        lastItem.Next = newItem;
        newItem.Before = lastItem;
        newItem.Next = this.trail;
        this.trail.Before = newItem;

        this.count++;
    }

    Dequeue(): T {
        if (this.count == 0) {
            return null;
        }
        let target = this.header.Next;

        this.header.Next = target.Next;
        target.Next.Before = this.header;
        this.count--;

        target.Before = null;
        target.Next = null;
        return target.Value;
    }

    //引用类型判断依据是是否指向同一份内存地址
    //值类型比较的是数值
    Contains(item: T): boolean {
        let startItem = this.header;
        while (startItem.Next != null) {
            if (startItem.Next.Value == item) {
                return true;
            }
            startItem = startItem.Next;
        }

        return false;
    }
    Empty(): boolean {
        return this.count === 0;
    }
    Count(): number {
        return this.count;
    }
    Clear() {
        this.header.Next = this.trail;
        this.trail.Before = this.header;
        this.count = 0;
    }

    /**
     * Get all elements in queue
     */
    All(): T[] {
        let result: T[] = [];
        let startItem = this.header;
        while (startItem.Next != null && startItem.Next != this.trail) {
            result.push(startItem.Next.Value);
            startItem = startItem.Next;
        }
        return result;
    }
}
