import { FSMState } from "../FSMState";
import { Enemy } from "./Enemy";
import { TransitionType } from "../TransitionType";
import { StateType } from "../StateType";


export class EnemyRetreatState extends FSMState {
    enemy: Enemy = null;
    constructor(_enemy: Enemy) {
        super();
        this.enemy = _enemy;
        this.stateType = StateType.EnemyRetreat;
    }
    protected InitTransitions() {
        this.AddTransition(TransitionType.EnemySeePlayer, StateType.EnemyChase);
        this.AddTransition(TransitionType.EnemyReachOrigin, StateType.EnemyIdle);
    }

    public Reason(dt: number, ...paras: any[]) {

        let disWithOrigin: number = this.enemy.spawnPos.sub(this.enemy.node.position).mag();
        if (disWithOrigin < 5) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemyReachOrigin);
            return;
        }


        if (this.enemy.player.fsmSystem.CurStateType == StateType.PlayerDeath) {
            return;
        }
        let disWithPlayer: number = this.enemy.player.node.position.sub(this.enemy.node.position).mag();
        if (disWithPlayer < this.enemy.guideDis) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemySeePlayer);
        }
    }

    public Act(dt: number, ...paras: any[]) {
        let dir = this.enemy.spawnPos.sub(this.enemy.node.position).normalize();
        this.enemy.node.position = this.enemy.node.position.add(new cc.Vec2(dir.x * dt * this.enemy.chaseSpeed, dir.y * dt * this.enemy.chaseSpeed));
    }
}
