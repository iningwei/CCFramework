import { FSMState } from "../FSMState";
import { Enemy } from "./Enemy";
import { TransitionType } from "../TransitionType";
import { StateType } from "../StateType";


export class EnemyChaseState extends FSMState {
    enemy: Enemy = null;
    private chaseTarget: cc.Node = null;
    constructor(_enemy: Enemy) {
        super();
        this.enemy = _enemy;
        this.chaseTarget = this.enemy.player.node;
        this.stateType = StateType.EnemyChase;
    }

    protected InitTransitions() {
        this.AddTransition(TransitionType.EnemyLostPlayer, StateType.EnemyRetreat);
        this.AddTransition(TransitionType.EnemyReachTarget, StateType.EnemyIdle);
    }

    public Reason(dt: number, ...paras: any[]) {
        if (this.enemy.player.fsmSystem.CurStateType == StateType.PlayerDeath) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemyLostPlayer);
            return;
        }
        let disWithTarget = this.chaseTarget.position.sub(this.enemy.node.position).mag();
        if (disWithTarget > this.enemy.retreatDis) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemyLostPlayer);
        }
        else if (disWithTarget < 5) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemyReachTarget);
        }
    }

    public Act(dt: number, ...paras: any[]) {
        let dis = this.chaseTarget.position.sub(this.enemy.node.position).mag();
        if (dis < 5) {
            return;
        }

        let dir = this.chaseTarget.position.sub(this.enemy.node.position).normalize();
        this.enemy.node.position = this.enemy.node.position.add(new cc.Vec2(dir.x * dt * this.enemy.chaseSpeed, dir.y * dt * this.enemy.chaseSpeed));
    }
}
