import { NodeExt } from "./SelfTool/NodeExt";
import Debug from "./SelfTool/Debug";

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
export default class Test extends cc.Component {


    start() {
        // let ttt1 = NodeExt.Search(this.node, "ttt");
        // if (ttt1 == null) {
        //     Debug.Error("ttt1 is null");
        // }
        // else {
        //     Debug.Error("ttt1 string:" + ttt1.getComponent(cc.Label).string);
        // }


        // let ttt2 = NodeExt.FindChildByName2(this.node, "ttt");
        // if (ttt2 == null) {
        //     Debug.Error("ttt2 is null");
        // }
        // else {
        //     Debug.Error("ttt2 string:" + ttt2.getComponent(cc.Label).string);
        // }
        let x = NodeExt.GetChildByPath(this.node, "New Node/button2/sprite2");
        if (x == null) {
            Debug.Log("未能@  找到目标");
        }
        else {
            Debug.Log("找到目标，pos:" + x.position);
        }
    }


}
