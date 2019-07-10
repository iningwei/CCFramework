
class Node<T> {
    public value: T = null;
    public next: Node<T> = null;

    constructor(private _value: T, private _next: Node<T> = null) {
        this.value = _value;
        this.next = _next;
    }
}


/**
 * 单向泛型链表
 * 一个很像C#中List的链表
 * 不支持[]索引的方式，需要使用GetAt(),SetAt()方法代替
 */
export class List<T> {
    private header: Node<T>;//头指针

    constructor() {
        this.header = new Node(null, null);
    }

    private count: number = 0;
    /**
     * 链表中增加一项数据
     * @param value 项
     */
    public Add(value: T) {
        let newNode = new Node<T>(value);

        let last: Node<T> = this.header;
        while (last.next != null) {
            last = last.next;
        }
        last.next = newNode;

        if (this.count == 0) {
            this.header.next = newNode;
        }


        this.count++;
    }


    /**
     * 在指定位置往列表中插入数据项
     * @param index 
     * @param value 
     */
    public Insert(index: number, value: T): void {
        if (index < 0 || index > this.count - 1) {
            throw ("insert error, index:" + index + "out of range");
            return;
        }

        let tmp;
        if (index == 0) {
            tmp = this.header;
        }
        else {
            tmp = this.getNodeAt(index - 1);//插入位置的前一个节点
        }


        let newNode = new Node<T>(value);
        let oldNext = tmp.next;
        tmp.next = newNode;
        newNode.next = oldNext;

        this.count++;
    }



    /**
     * 从List中删除第一次出现value的项
     */
    public Remove(value: T): boolean {
        let beforeNode = this.header;
        let tmp = this.header.next;
        while (tmp != null) {
            if (tmp.value == value) {
                beforeNode.next = tmp.next;
                this.count--;
                return true;
            }
            beforeNode = tmp;
            tmp = tmp.next;
        }
        return false;
    }




    /**
     * 移除链表中指定位置的数据项      
     * @param index 指定位置
     */
    public RemoveAt(index: number) {
        if (index < 0 || index > this.count - 1) {
            throw ("RemoveAt error, index:" + index + ", out of range");
        }


        let curIndex = -1;
        let beforeNode = this.header;
        let tmp = this.header.next;
        while (tmp != null) {
            curIndex++;
            if (curIndex == index) {
                beforeNode.next = tmp.next;

                this.count--;
                return;
            }
            beforeNode = tmp;
            tmp = tmp.next;
        }

    }

    /**
     * 是否含有指定值
     * @param value 
     */
    public Contains(value: T): boolean {
        let tmp = this.header;
        while (tmp.next != null) {
            if (tmp.next.value == value) {
                return true;
            }
            tmp = tmp.next;
        }
        return false;
    }

    /**
     * 获得第一个匹配值的位置
     * @param value 
     */
    public IndexOf(value: T): number {
        let tmp = this.header;
        let index = -1;
        while (tmp.next != null) {
            index++;
            // console.log("------->index:" + index + ", value:" + tmp.next.value + ", taregetValue:" + value);
            if (tmp.next.value == value) {
                return index;
            }
            tmp = tmp.next;
        }
        return index;
    }



    public GetAt(index: number): T {
        if (index < 0 || index > this.count - 1) {
            throw ("GetAt error, index:" + index + ", out of range");
        }
        let curIndex = -1;
        let tmp = this.header.next;
        while (tmp != null) {
            curIndex++;
            if (curIndex == index) {
                return tmp.value;
            }
            tmp = tmp.next;
        }
        return null;
    }

    public SetAt(index: number, value: T) {
        this.getNodeAt(index).value = value;
    }

    private getNodeAt(index: number): Node<T> {
        if (index < 0 || index > this.count - 1) {
            throw ("GetAt error, index:" + index + ", out of range");
        }
        let curIndex = -1;
        let tmp = this.header.next;
        while (tmp != null) {
            curIndex++;
            if (curIndex == index) {
                return tmp;
            }
            tmp = tmp.next;
        }
        return null;
    }



    /**
     * 清除所有数据
     */
    public Clear() {
        this.header.next = null;
        this.count = 0;
    }



    /**
     * 获取链表长度
     */
    get Count(): number {
        return this.count;
    }

    public IsEmpty(): boolean {
        return this.count === 0;
    }


    /**
     * 链表反转
     */
    public Reverse() {
        let tmp: Node<T> = this.header.next;
        let oldNext = tmp.next;
        while (tmp != null && oldNext != null) {
            let oldTmp = tmp;
            tmp = oldNext;
            oldNext = oldNext.next;
            tmp.next = oldTmp;
            if (oldTmp.next == tmp) {
                oldTmp.next = null;
            }
        }
        this.header.next = tmp;
    }

    public ToArray(): Array<T> {
        let result: Array<T> = new Array<T>();
        let tmp: Node<T> = this.header.next;
        while (tmp != null) {
            result.push(tmp.value);
            tmp = tmp.next;
        }
        return result;
    }



    /**
     * 提供一个方法，用来Log输出List中的所有数据
     */
    public Log() {
        let tmp = this.header.next;
        let str: string = "";
        while (tmp != null) {
            str = str + tmp.value + ",";
            tmp = tmp.next;
        }
        str = str.slice(0, str.length - 2);
        console.log(str);
    }
}
