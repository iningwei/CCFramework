
export class ResLoader {
    private static timeout = 2;
    private static retryCount: number = 3;

    public static Load(url: string, type: typeof cc.Asset, completeCallback: (err: Error, result: any) => void): void {
        let count = ResLoader.retryCount + 1;


        //timeout
        let hasCb = false;
        let timer = setTimeout(() => {
            hasCb = true;
            completeCallback && completeCallback({
                name: "timeout",
                message: "timeout"
            }, null);
        }, ResLoader.timeout);

        //real load
        let realLoad = function () {
            count--;
            //load
            cc.loader.loadRes(url, type, (err, result) => {
                if (!err || count <= 0) {
                    clearTimeout(timer);
                    !hasCb && completeCallback && completeCallback(err, result);
                    return;
                }
                realLoad();
            });

        };
        realLoad();
    }
}