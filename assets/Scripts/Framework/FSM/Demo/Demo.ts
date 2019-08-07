import { FSMSystem } from "../FSMSystem";
import Player from "./Player";
import { Enemy } from "./Enemy";


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
export default class Demo extends cc.Component {
    @property(cc.Node)
    playerNode: cc.Node = null;
    @property(cc.Node)
    enemyNode: cc.Node = null;


    private player: Player;
    private enemy: Enemy;
    start() {
        this.player = new Player(this.playerNode);
        this.enemy = new Enemy(this.enemyNode, this.player);
    }

    update(dt) {
        this.player.Update(dt);
        this.enemy.Update(dt);
    }


    HPMinus() {
        this.player.hp -= 1000;
    }
}
