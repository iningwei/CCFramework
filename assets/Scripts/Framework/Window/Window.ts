import { WindowLayer } from "./WindowLayer";

export class Window {
    public layer: WindowLayer;
    public isCache: boolean;

    /**
     * 
     * @param node  
     * @param name  
     * @param layer 
     * @param isCache 
     */
    constructor(public node: cc.Node, public name: string) {

        this.Init();
    }

    public Init() {

    }
    public Show(layer: WindowLayer, datas: any[]) {
        this.layer = layer;
        this.node.position = new cc.Vec2(0, 0);
        this.node.scale = 1;
        this.node.active = true;
    }
    public Hide() {
        this.node.active = false;
    }
    public Update(dt: number) {

    }
    public Destroy() {
        this.node.removeFromParent();
        this.node.destroy();
    }
}
