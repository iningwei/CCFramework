import { FSMState } from "../FSMState";
import Player from "./Player";
import { StateType } from "../StateType";


export class PlayerDeathState extends FSMState {
    player: Player;
    constructor(_player: Player) {
        super();
        this.player = _player;
        this.stateType = StateType.PlayerDeath;
    }

    public Act(dt: number, ...paras: any[]) {
        console.log("主角已死！");
    }


}
