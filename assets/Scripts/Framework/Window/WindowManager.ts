import { WindowName } from "./WindowName";
import { WindowLayer } from "./WindowLayer";
import { Dictionary } from "../../SelfTool/Generic/Dictionary";
import Debug from "../../SelfTool/Debug";
import { WindowX } from "./WindowX";
import { ResLoader } from "../Res/ResLoader";
import { MainWindow } from "../../Logic/MainWindow/MainWindow";
import { BattleWindow } from "../../Logic/BattleWindow/BattleWindow";
import { DebugWindow } from "../../Logic/DebugWindow/DebugWindow";

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
    public GetLayerNodes(): Dictionary<WindowLayer, cc.Node> {
        return this.layerNodes;
    }

    public Init() {

        this.initLayerNodes();

    }
    private initLayerNodes() {
        this.layerNodes.Add(WindowLayer.Cache, cc.find("Canvas/Layers/Cache"));
        this.layerNodes.Add(WindowLayer.Bottom, cc.find("Canvas/Layers/Bottom"));
        this.layerNodes.Add(WindowLayer.Basic, cc.find("Canvas/Layers/Basic"));
        this.layerNodes.Add(WindowLayer.SceneChange, cc.find("Canvas/Layers/SceneChange"));
        this.layerNodes.Add(WindowLayer.Msg, cc.find("Canvas/Layers/Msg"));
        this.layerNodes.Add(WindowLayer.Top, cc.find("Canvas/Layers/Top"));
        this.layerNodes.Add(WindowLayer.Debug, cc.find("Canvas/Layers/Debug"));
    }

    private addWindowToOpenDic(name: WindowName, w: WindowX) {
        if (this.checkWindowOpened(name)) {
            Debug.Error(name + "已经在openDic中");
            return;
        }
        this.openedWindows.Add(name, w);
    }
    private removeWindowFromOpenDic(name: WindowName) {
        if (!this.checkWindowOpened(name)) {
            Debug.Error(name + "不在openDic中");
            return;
        }
        this.openedWindows.Remove(name);
    }
    private addWindowToCacheDic(name: WindowName, w: WindowX) {
        if (this.checkWindowCached(name)) {
            Debug.Error(name + "已经在cacheDic中");
            return;
        }
        this.cachedWindows.Add(name, w);
    }
    private removeWindowFromCacheDic(name: WindowName) {
        if (!this.checkWindowCached(name)) {
            Debug.Error(name + "不在cacheDic中");
            return;
        }
        this.cachedWindows.Remove(name);
    }

    public GetOpenedWindow(windowName: WindowName): WindowX {
        if (!this.checkWindowOpened(windowName)) {
            Debug.Error(windowName + " 不在openDic中");
            return null;
        }
        return this.openedWindows[windowName];
    }



    public Show(windowName: WindowName, layer: WindowLayer, isCache: boolean = false, datas: any[] = null) {
        let window: WindowX = null;
        if (this.checkWindowOpened(windowName)) {
            Debug.Warn("warning, the window: " + windowName + " is already opened");
            return;
        }
        if (this.checkWindowCached(windowName)) {
            window = this.getCachedWindow(windowName);
            window.Show(layer, isCache, datas);
            this.addWindowToOpenDic(windowName, window);
            this.removeWindowFromCacheDic(windowName);
        }
        else {
            ResLoader.LoadPrefab("Windows/" + windowName, (object) => {
                let windowNode = cc.instantiate(object);
                switch (windowName) {
                    case WindowName.MainWindow:
                        window = new MainWindow(windowNode, windowName)
                        break;
                    case WindowName.BattleWindow:
                        window = new BattleWindow(windowNode, windowName);
                        break;
                    case WindowName.DebugWindow:
                        window = new DebugWindow(windowNode, windowName);
                        break;
                    //TODO:更多窗体类型  
                    default:
                        Debug.Error(windowName + "没有集成！");
                        break;
                }

                window.Show(layer, isCache, datas);
                this.addWindowToOpenDic(windowName, window);
            });
        }
    }


    public Close(windowName: WindowName) {
        let window = this.getOpenedWindow(windowName);
        if (window != null) {
            window.Close();
            this.removeWindowFromOpenDic(windowName);
            if (window.isCache) {
                this.addWindowToCacheDic(windowName, window);
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


}
