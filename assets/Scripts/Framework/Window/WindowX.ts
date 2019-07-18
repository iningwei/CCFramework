import { WindowLayer } from "./WindowLayer";
import { WindowName } from "./WindowName";
import { WindowManager } from "./WindowManager";

//Window会和JS自带的Window类冲突，故使用WindowX
export class WindowX {   
    public layer: WindowLayer;
    public isCache: boolean;

    /**
     * 
     * @param node  
     * @param name  
     * @param layer 
     * @param isCache 
     */
    constructor(public node: cc.Node, public name: WindowName) {
        
        this.Init();
    }

    public Init() {


    }
    public Show(layer: WindowLayer, isCache: boolean, datas: any[]) {
        this.layer = layer;
        this.isCache = isCache;
        WindowManager.Instance.SetLayer(this.node, layer);
        this.node.active = true;
    }

    /**
     * 关闭的时候根据isCache来决定是隐藏到Cache节点下，还是直接销毁
     */
    public Close() {
        if (this.isCache) {
            WindowManager.Instance.SetLayer(this.node, WindowLayer.Cache);
            this.node.active = false;

        }
        else {
            this.node.removeFromParent();
            this.node.destroy();
            this.node = null;
        }
    }
    public Update(dt: number) {

    }
 
}
