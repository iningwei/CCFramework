export class Sort {
    /**
     * 冒泡排序
     * @param arr 
     */
    public static Bubble(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    let t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                }
            }
        }
    }



    /**
     * 选择排序
     * @param arr 
     */
    public static Select(arr: number[]) {
        let minIndex: number = 0;
        for (let i = 0; i < arr.length; i++) {
            minIndex = i;
            for (let j = i; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            //交换
            let t = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = t;
        }
    }



    public static Insert(arr:number[]){
        if(arr==null||arr==undefined||arr.length){
            return arr;
        }
        for (let i = 0; i < arr.length; i++) {
            for (let j = i+1; j < arr.length; j++) {
                const element = arr[j];
                
            }
            
        }
    }
}