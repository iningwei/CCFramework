/**
 * 一个很像C#中Dictionary结构的字典
 * 但是并没有实现hash结构，借用数组来存储key和value，因此其是有序的 
 * 支持索引的方式取值，和设置值
 */
export class Dictionary<K, V>   {
    private keys: K[] = [];
    private values: V[] = [];

    public constructor() {
    }

    /**
     * 增加一项键值对
     * 已经存在该键，则会抛出异常
     * @param key 
     * @param value 
     */
    Add(key: any, value: any) {
        if (this.ContainsKey(key)) {
            throw "dulicate key:" + key;//抛出异常
        }
        this[key] = value;
        this.keys.push(key);
        this.values.push(value);
    }

    /**
     * 根据键名，移除键值对    
     * @param key 要移除的键
     */
    Remove(key: any) {
        let index = this.keys.indexOf(key, 0);
        if (index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            delete this[key];
        }
    }

    /**
     * 根据Key获得值，结果存在out中
     * 返回false说明不存在该key
     * @param key 
     * @param out 
     */
    TryGetValue(key: K, out: V): boolean {
        let index = this.keys.indexOf(key, 0);
        if (index != -1) {
            out = this.values[index];
            return true;
        }
        return false;
    }

    /**
     * 检测是否存在指定键的键值对
     * @param key 目标键
     */
    ContainsKey(key: K): boolean {
        for (let i = 0; i < this.keys.length; i++) {
            const element = this.keys[i];
            if (element == key) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否含有指定值
     * @param value 
     */
    ContainsValue(value: V): boolean {
        for (let i = 0; i < this.keys.length; i++) {
            const key = this.keys[i];
            let tmp: V = null;
            this.TryGetValue(key, tmp);
            if (tmp == value) {
                return true;
            }

        }
        return false;
    }

    /**
     * 更新键值对（若键名不存在，则返回false）。特别是非引用类型的value，可以通过该方法实现更新。
     * 若键不存在，则返回false。更新成功，返回true
     * @param key 键名 
     * @param value 新值
     */
    SetDicValue(key: any, value: any): boolean {
        let index = this.keys.indexOf(key, 0);
        if (index != -1) {
            this.keys[index] = key;
            this.values[index] = value;
            this[key] = value;
            return true;
        }
        return false;
    }

    /**
     * 获得所有的键
     */
    get Keys(): K[] {
        return this.keys;
    }

    /**
     * 获得所有的值
     */
    get Values(): V[] {
        return this.values;
    }

    /**
     * 获得长度
     */
    get Count(): number {
        return this.keys.length;
    }

    /**
     * 清空Dic
     */
    Clear() {
        this.keys = [];
        this.values = [];
    }
}
