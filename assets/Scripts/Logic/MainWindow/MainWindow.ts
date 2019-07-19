import { WindowX } from "../../Framework/Window/WindowX";
import { WindowName } from "../../Framework/Window/WindowName";
import { WindowLayer } from "../../Framework/Window/WindowLayer";
import Debug from "../../SelfTool/Debug";
import { NodeExt } from "../../SelfTool/NodeExt";
import TouchComp from "../../SelfTool/TouchComp/TouchComp";
import { WindowManager } from "../../Framework/Window/WindowManager";
import { MainController } from "./MainController";
import BattleController from "../BattleWindow/BattleController";


export class MainWindow extends WindowX {
    private toBattle: cc.Node;

    constructor(node: cc.Node, name: WindowName) {
        super(node, name);
    }

    protected LinkUI() {
        this.toBattle = NodeExt.GetChildByName(this.node, "battleBtn");
    }

    public AddUIEventListener() {
        this.toBattle.addComponent(TouchComp).SetTouchEndCallback(this.onToBattleClicked.bind(this));
    }

    public RemoveUIEventListener() {

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

    private onToBattleClicked(event: cc.Event.EventTouch) {
        MainController.Instance.CloseWindow();
        BattleController.Instance.ShowWindow(WindowLayer.Basic);
    }
}
