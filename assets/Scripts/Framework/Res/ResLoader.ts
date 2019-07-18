import Debug from "../../SelfTool/Debug";

export class ResLoader {
    private static timeout = 2;
    private static retryCount: number = 3;

    static load(path: string, type: typeof cc.Asset, completeCallback: (object: any) => void): void {
        let count = ResLoader.retryCount;


        cc.loader.loadRes(path, type, (err, result) => {
            if (err) {
                Debug.Error("error,while load " + path);
                return;
            }
            completeCallback && completeCallback(result);
        });
    }

    
    public static LoadTex(path: string, completeCallback: (object: any) => void) {
        this.load(path, cc.SpriteFrame, completeCallback);
    }
    public static LoadPrefab(path: string, completeCallback: (object: any) => void) {
        this.load(path, cc.Prefab, completeCallback);
    }

}