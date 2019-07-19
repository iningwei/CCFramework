import { WindowManager } from "../Framework/Window/WindowManager";
import { WindowName } from "../Framework/Window/WindowName";
import { WindowLayer } from "../Framework/Window/WindowLayer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {
    private openDebugWindow: boolean = true;
    onLoad() {
        this.Init();
    }

    start() {
        WindowManager.Instance.Show(WindowName.MainWindow, WindowLayer.Basic);

        if (this.openDebugWindow) {
            WindowManager.Instance.Show(WindowName.DebugWindow, WindowLayer.Debug);
        }
    }

    update(dt) { }



    private Init() {
        WindowManager.Instance.Init();
    }
}
