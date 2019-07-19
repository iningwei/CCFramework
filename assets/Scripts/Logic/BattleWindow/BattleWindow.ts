import { WindowX } from "../../Framework/Window/WindowX";
import { WindowName } from "../../Framework/Window/WindowName";
import { WindowLayer } from "../../Framework/Window/WindowLayer";
import { NodeExt } from "../../SelfTool/NodeExt";
import TouchComp from "../../SelfTool/TouchComp/TouchComp";
import { WindowManager } from "../../Framework/Window/WindowManager";


export class BattleWindow extends WindowX {
    private back: cc.Node;

    constructor(node: cc.Node, name: WindowName) {
        super(node, name);
    }

    protected LinkUI() {
        this.back = NodeExt.GetChildByName(this.node, "backBtn");
    }

    public AddUIEventListener() {
        this.back.addComponent(TouchComp).SetTouchEndCallback(this.onBackClicked.bind(this));
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

    private onBackClicked(event: cc.Event.EventTouch) {
        WindowManager.Instance.Show(WindowName.MainWindow, WindowLayer.Basic, false, null);
        WindowManager.Instance.Close(this.name);
    }
}
