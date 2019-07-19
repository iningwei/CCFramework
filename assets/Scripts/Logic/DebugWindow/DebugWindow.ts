import { WindowX } from "../../Framework/Window/WindowX";
import { WindowName } from "../../Framework/Window/WindowName";
import { NodeExt } from "../../SelfTool/NodeExt";
import TouchComp from "../../SelfTool/TouchComp/TouchComp";
import { WindowManager } from "../../Framework/Window/WindowManager";
import Debug from "../../SelfTool/Debug";
import { WindowLayer } from "../../Framework/Window/WindowLayer";

export class DebugWindow extends WindowX {
    private getLayerMsg: cc.Node;

    constructor(node: cc.Node, name: WindowName) {
        super(node, name);
    }

    protected LinkUI() {
        this.getLayerMsg = NodeExt.GetChildByName(this.node, "getWindowLayerMsg");
    }
    public AddUIEventListener() {
        this.getLayerMsg.addComponent(TouchComp).SetTouchEndCallback(this.onGetLayerMsgClicked.bind(this));
    }

    public Show(layer: WindowLayer, isCache: boolean, datas: any[]) {
        super.Show(layer, isCache, datas);
    }
    public Close() {
        super.Close();
    }
    public Update(dt: number) {
        super.Update(dt);
    }


    private onGetLayerMsgClicked(event: cc.Event.EventTouch) {
        let nodes = WindowManager.Instance.GetLayerNodes();
        let keys = nodes.Keys;
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            let node: cc.Node = nodes[element];
            if (node.childrenCount > 0) {
                Debug.Log("layer " + node.name + "下有窗口：")
                for (let j = 0; j < node.childrenCount; j++) {
                    const element = node.children[j];
                    Debug.Log(element.name);
                }
            }

        }
    }
}
