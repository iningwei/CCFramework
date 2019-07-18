import { WindowName } from "./WindowName";
import { WindowLayer } from "./WindowLayer";
import { Dictionary } from "../../SelfTool/Generic/Dictionary";
import Debug from "../../SelfTool/Debug";
import { WindowX } from "./WindowX";
import { ResLoader } from "../Res/ResLoader";

export class WindowManager {
    private static instance: WindowManager = null;
    public static get Instance(): WindowManager {
        if (this.instance == null) {
            this.instance = new WindowManager();
        }
        return this.instance;
    }

    private cachedWindows: Dictionary<WindowName, WindowX> = new Dictionary<WindowName, WindowX>();
    private openedWindows: Dictionary<WindowName, WindowX> = new Dictionary<WindowName, WindowX>();
    private layerNodes: Dictionary<WindowLayer, cc.Node> = new Dictionary<WindowLayer, cc.Node>();
    public Init() {
        this.initLayerNodes();
    }



    public Show(windowName: WindowName, layer: WindowLayer, isCache: boolean, datas: any[]) {
        let window: WindowX = null;
        if (this.checkWindowOpened(windowName)) {
            Debug.Warn("warning, the window: " + windowName + " is already opened");
            return;
        }
        if (this.checkWindowCached(windowName)) {
            window = this.getCachedWindow(windowName);
            window.Show(layer, isCache, datas);            
            this.openedWindows[windowName]=window;
            this.cachedWindows.Remove(windowName);//从缓存中删除
        }
        else {
            ResLoader.LoadPrefab("Windows/" + windowName, (object) => {
                let windowNode = cc.instantiate(object);
                window = new WindowX(windowNode, windowName)
                window.Show(layer, isCache, datas);
                this.openedWindows[windowName]=window;
            });
        }
    }


    public Close(windowName: WindowName) {
        let window = this.getOpenedWindow(windowName);
        if (window != null) {
            window.Close();
            if (window.isCache) {
                if (this.checkWindowCached(windowName)) {
                    Debug.Error("something wrong,缓存已存在");
                }
                this.cachedWindows[windowName] = window;//加入缓存
            }
            else {
                this.openedWindows.Remove(windowName);
            }
        }
        else {
            Debug.Error("无法关闭窗口：" + windowName + ",因为它并没有打开");
        }

    }

    public Update(dt: number) {
        for (let i = 0; i < this.openedWindows.Values.length; i++) {
            const element = this.openedWindows.Values[i];
            element.Update(dt);
        }
    }

    public SetLayer(targetNode: cc.Node, layer: WindowLayer) {
        targetNode.parent = this.layerNodes[layer];
        targetNode.scale = 1;
        targetNode.position = new cc.Vec2(0, 0);
    }


    /**
     * 获得缓存窗口
     * 调用前需要先使用checkWindowCached方法来检测窗口是否在缓存当中
     * @param windowName 
     */
    private getCachedWindow(windowName: WindowName): WindowX {
        return this.cachedWindows[windowName];
    }
    /**
     * 检测某个窗口是否已经打开
     * @param windowName 
     */
    private checkWindowOpened(windowName: WindowName): boolean {
        if (this.openedWindows.ContainsKey(windowName)) {
            return true;
        }
        return false;
    }

    private checkWindowCached(windowName: WindowName): boolean {
        if (this.cachedWindows.ContainsKey(windowName)) {
            return true;
        }
        return false;
    }

    private getOpenedWindow(windowName: WindowName): WindowX {
        if (!this.checkWindowOpened(windowName)) {
            Debug.Error("error " + windowName + ",并没有打开");
            return null;
        }
        else {
            return this.openedWindows[windowName];
        }
    }

    private initLayerNodes() {
        this.layerNodes.Add(WindowLayer.Cache, cc.find("Canvas/Layers/Cache"));
        this.layerNodes.Add(WindowLayer.Bottom, cc.find("Canvas/Layers/Bottom"));
        this.layerNodes.Add(WindowLayer.Basic, cc.find("Canvas/Layers/Basic"));
        this.layerNodes.Add(WindowLayer.SceneChange, cc.find("Canvas/Layers/SceneChange"));
        this.layerNodes.Add(WindowLayer.Msg, cc.find("Canvas/Layers/Msg"));
        this.layerNodes.Add(WindowLayer.Top, cc.find("Canvas/Layers/Top"));
    }
}
