import { Role } from "./Role";
import { PlayerNormalState } from "./PlayerNormalState";
import { PlayerDeathState } from "./PlayerDeathState";

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
export default class Player extends Role {
    public speed: number = 330;
    public hp: number = 100;
    constructor(_node: cc.Node) {
        super(_node);
        this.InitFSMSystem();
    }

    protected InitFSMSystem() {
        this.fsmSystem.AddState(new PlayerNormalState(this));
        this.fsmSystem.AddState(new PlayerDeathState(this));
    }





    public Update(dt: number): void {
        super.Update(dt);
    }

}
