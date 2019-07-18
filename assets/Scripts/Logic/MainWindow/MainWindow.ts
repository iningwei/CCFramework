import { WindowX } from "../../Framework/Window/WindowX";
import { WindowName } from "../../Framework/Window/WindowName";
import { WindowLayer } from "../../Framework/Window/WindowLayer";


export class MainWindow extends WindowX {
    private toBattleBtn:cc.Node;

    constructor(node: cc.Node, name: WindowName) {
        super(node, name);

    }

    public Init() {
         

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
}
