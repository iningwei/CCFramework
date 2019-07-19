export class Sort {
    /**
     * 选择
     * 时间复杂度O(n^2)
     * 空间复杂度O(1)
     * 稳定排序
     * 原地排序
     * @param arr 
     */
    public static Select(arr: number[]) {
        if (arr == null || arr == undefined || arr.length < 2) {
            return;
        }

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
     * 时间复杂度O(n^2)
     * 空间复杂度O(1)
     * 稳定排序
     * 原地排序
     */
    public static SelectPro(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            let minIndex: number = i;
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


    public static Bubble(arr: number[]) {
        if (arr == null || arr == undefined || arr.length < 2) {
            return;
        }

        let n: number = arr.length
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // if (arr[j + 1] > arr[j]) {//降序
                //     let tmp = arr[j];
                //     arr[j] = arr[j + 1];
                //     arr[j + 1] = tmp;
                // }
                if (arr[j + 1] < arr[j]) {//升序
                    let tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
    }

    public static BubblePro(arr: number[]) {
        if (arr == null || arr == undefined || arr.length < 2) {
            return;
        }

        let n: number = arr.length
        for (let i = 0; i < n; i++) {
            let flag: boolean = true;
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j + 1] < arr[j]) {//升序
                    flag = false;
                    let tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
            if (flag) {
                break;
            }
        }
    }







    /**
     * 插入排序
     * 时间复杂度O(n^2)
     * 空间复杂度O(1)
     * 稳定排序
     * 原地排序
     * @param arr 
     */
    public static Insert(arr: number[]) {
        if (arr == null || arr == undefined || arr.length < 2) {
            return;
        }
        for (let i = 1; i < arr.length; i++) {
            let pos = i;//记录位置
            for (let j = i - 1; j >= 0; j--) {
                if (arr[pos] < arr[j]) {
                    //交换      
                    let tmp = arr[pos];
                    arr[pos] = arr[j];
                    arr[j] = tmp;
                    pos--;
                }
            }

        }
    }
}