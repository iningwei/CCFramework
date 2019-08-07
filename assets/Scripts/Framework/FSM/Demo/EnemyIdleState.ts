import { FSMState } from "../FSMState";
import { Enemy } from "./Enemy";
import { TransitionType } from "../TransitionType";
import { StateType } from "../StateType";


export class EnemyIdleState extends FSMState {
    enemy: Enemy = null;
    constructor(_enemy: Enemy) {
        super();
        this.enemy = _enemy;
        this.stateType = StateType.EnemyIdle;
    }
    protected InitTransitions() {
        this.AddTransition(TransitionType.EnemyReachOrigin, StateType.EnemyIdle);
        this.AddTransition(TransitionType.EnemySeePlayer, StateType.EnemyChase);
        this.AddTransition(TransitionType.EnemyLostPlayer, StateType.EnemyRetreat);
    }


    public Reason(dt: number, ...paras: any[]) {

        if (this.enemy.player.fsmSystem.CurStateType == StateType.PlayerDeath) {
            return;
        }
        let disWithPlayer: number = this.enemy.node.position.sub(this.enemy.player.node.position).mag();
        if (disWithPlayer < this.enemy.guideDis) {
            this.enemy.fsmSystem.PerformTransition(TransitionType.EnemySeePlayer);
        }

    }
    public Act(dt: number, ...paras: any[]) {

    }
}
