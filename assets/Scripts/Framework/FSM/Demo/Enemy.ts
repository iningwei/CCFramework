import { Role } from "./Role";
import { EnemyIdleState } from "./EnemyIdleState";
import Player from "./Player";
import { EnemyChaseState } from "./EnemyChaseState";
import { EnemyRetreatState } from "./EnemyRetreatState";

export class Enemy extends Role {
    public player: Player;
    /**
     * 预警距离
     * 当玩家和其距离低于该距离，Enemy会从Idle或者Retreat状态 进入Chase状态
     */
    public guideDis: number = 150;
    /**
     * 撤退距离
     * 当玩家和其距离大于该距离，Enemy会从Chase状态 进入Retreat状态
     */
    public retreatDis: number = 400;

    /**
     * 追逐速度 xx/s
     */
    public chaseSpeed: number = 80;
    /**
     * 原始位置
     * Retreat的目标点即此。到达原始位置后，Enemy会进入Idle状态
     */
    public originPos: cc.Vec2;
    constructor(_node: cc.Node, _player: Player) {
        super(_node);
        this.player = _player;
        this.originPos = this.node.position;

        this.InitFSMSystem();
    }

    protected InitFSMSystem() {
        this.fsmSystem.AddState(new EnemyIdleState(this));
        this.fsmSystem.AddState(new EnemyChaseState(this));
        this.fsmSystem.AddState(new EnemyRetreatState(this));

    }
    public Update(dt: number): void {
        super.Update(dt);
    }
}
