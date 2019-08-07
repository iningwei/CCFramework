import { FSMState } from "../FSMState";
import { TransitionType } from "../TransitionType";
import { StateType } from "../StateType";
import Player from "./Player";


export class PlayerNormalState extends FSMState {
    player: Player;
    constructor(_player: Player) {
        super();
        this.player = _player;
        this.stateType = StateType.PlayerNormal;
    }

    protected InitTransitions() {
        this.AddTransition(TransitionType.PlayerDeath, StateType.PlayerDeath);
    }

    public Reason(dt: number, ...paras: any[]) {
        if (this.player.hp < 0) {
            this.player.fsmSystem.PerformTransition(TransitionType.PlayerDeath);
        }
    }

    public Act(dt: number, ...paras: any[]) {
        if (this.moveDir != 0) {
            this.player.node.position = this.player.node.position.add(this.getMoveOffset(this.moveDir, dt));
        }
    }


    protected AddEventListeners() {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    protected RemoveEventListeners() {

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.setMove(1);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.setMove(2);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.setMove(3);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.setMove(4);
                break;
        }
    }
    private onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.setMove(0);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.setMove(0);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.setMove(0);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.setMove(0);
                break;
        }
    }


    private moveDir: number = 0;

    /**
     * 
     * @param dir 1 left, 2 right, 3 up, 4 down, 0表示不移动
     */
    private setMove(dir: number) {
        this.moveDir = dir;
    }
    private getMoveOffset(dir: number, dt): cc.Vec2 {

        let offset: cc.Vec2 = new cc.Vec2(0, 0);
        if (dir == 1) {
            offset.x = -dt * this.player.speed;
        }
        else if (dir == 2) {
            offset.x = dt * this.player.speed;
        }
        else if (dir == 3) {
            offset.y = dt * this.player.speed;
        }
        else if (dir == 4) {
            offset.y = -dt * this.player.speed;
        }

        return offset;
    }



}
