import { Dictionary } from "../../SelfTool/Generic/Dictionary";
import { TransitionType } from "./TransitionType";
import { StateType } from "./StateType";
import Debug from "../../SelfTool/Debug";

export class FSMState {
    protected map: Dictionary<TransitionType, StateType> = new Dictionary();
    protected stateType: StateType;
    public get StateType(): StateType {
        return this.stateType;
    }

    constructor() {
        this.InitTransitions();
        this.AddEventListeners();
    }

    protected InitTransitions() {

    }

    protected AddTransition(trans: TransitionType, state: StateType): void {
        if (trans == TransitionType.None) {
            Debug.Error("error, not allow add TransitionType None");
            return;
        }
        if (state == StateType.None) {
            Debug.Error("error, not allow add StateType None");
            return;
        }

        if (this.map.ContainsKey(trans)) {
            Debug.Error("already exist transition:" + trans);
            return;
        }
        this.map.Add(trans, state);
    }

    protected DeleteTransition(trans: TransitionType) {
        if (trans == TransitionType.None) {
            Debug.Error("DeleteTransition None is not allowed");
            return;
        }
        if (this.map.ContainsKey(trans)) {
            this.map.Remove(trans);
            return;
        }
        Debug.Error("error, Transition:" + trans + " not exist, delete failed");
    }

    public GetOutputState(trans: TransitionType): StateType {
        if (this.map.ContainsKey(trans)) {
            return this.map[trans];
        }
        return StateType.None;
    }

    //----------->以下方法需要重写
    public DoBeforeEntering(): void {

    }
    public DoBeforeLeaving(): void {
        this.RemoveEventListeners();
    }

    protected AddEventListeners(): void {

    }
    protected RemoveEventListeners(): void {

    }

    public Reason(dt: number, ...paras: any[]) {

    }
    public Act(dt: number, ...paras: any[]) {

    }
}
