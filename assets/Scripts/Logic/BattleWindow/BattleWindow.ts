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
        this.back = NodeExt.Search(this.node, "backBtn");
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
        // MainController.Instance.ShowWindow(WindowLayer.Basic);
        // BattleController.Instance.CloseWindow();     //会产生循环引用的导致的undefined问题，暂时使用下面方式调用
        
        WindowManager.Instance.Close(WindowName.BattleWindow);
        WindowManager.Instance.Show(WindowName.MainWindow, WindowLayer.Basic);
    }
}
