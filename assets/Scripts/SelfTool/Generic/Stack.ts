interface IStack<T> {
    /**
     * 返回栈顶对象，但不移除
     */
    Peek(): T;
    /**
     * 向堆栈顶部添加对象
     * @param item 
     */
    Push(item: T): void;
    /**
     * 移除并返回栈顶对象
     */
    Pop(): T;
    Contains(item: T): boolean;
    Empty(): boolean;
    Count(): number;
    Clear(): void;

}

/**
 * Item in stack
 */
class Item<T>{
    private value: T;
    private next: Item<T>;
    constructor(private _value: T, private _next: Item<T> = null) {
        this.value = _value;
        this.next = _next;
    }
    set Value(value: T) {
        this.value = value;
    }
    get Value(): T {
        return this.value;
    }

    set Next(next: Item<T>) {
        this.next = next;
    }
    get Next(): Item<T> {
        return this.next;
    }
}

/**
 * 泛型实现的堆栈结构，后进先出LIFO
 */
export default class Stack<T> implements IStack<T>{
    private header: Item<T>;
    private count: number = 0;
    constructor() {
        this.header = new Item<T>(null);
    }

    Peek(): T {
        if (this.count == 0) {
            return null;
        }
        return this.header.Next.Value;
    }

    Push(item: T) {
        let newItem = new Item<T>(item);
        newItem.Next = this.header.Next;
        this.header.Next = newItem;
        this.count++;
    }

    Pop(): T {
        if (this.count == 0) {
            return null;
        }

        let target = this.header.Next;
        this.header.Next = target.Next;
        this.count--;

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
        this.header.Next = null;
        this.count = 0;
    }
}
