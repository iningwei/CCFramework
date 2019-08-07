import { FSMState } from "./FSMState";
import { List } from "../../SelfTool/Generic/List";
import { StateType } from "./StateType";
import Debug from "../../SelfTool/Debug";
import { TransitionType } from "./TransitionType";

export class FSMSystem {
    private states: List<FSMState> = null;

    private curStateType: StateType;
    public get CurStateType() {
        return this.curStateType;
    }
    private curState: FSMState;
    public get CurState(): FSMState {
        return this.curState;
    }

    constructor() {
        this.states = new List();
    }

    public AddState(state: FSMState): void {
        if (state == null) {
            Debug.Error("null is not allowed");
        }
        if (this.states.Count == 0) {//第一个添加的状态为初始状态
            this.states.Add(state);
            this.curState = state;
            this.curStateType = state.StateType;
            return;
        }
        for (let i = 0; i < this.states.Count; i++) {
            const element = this.states.GetAt(i);
            if (element.StateType == state.StateType) {
                Debug.Warn("不能重复添加FSMState哦，state:" + state.StateType)
                return;
            }
        }
        this.states.Add(state);
    }

    public DeleteState(stateType: StateType) {
        if (stateType == StateType.None) {
            Debug.Error("error, Delete state None is not allowed");
            return;
        }
        for (let i = 0; i < this.states.Count; i++) {
            const element = this.states.GetAt(i);
            if (element.StateType == stateType) {
                this.states.RemoveAt(i);
                return;
            }
        }
        Debug.Error("delete state:" + stateType + " failed,it is not exist in state list");
    }


    public PerformTransition(trans: TransitionType) {
        if (trans == TransitionType.None) {
            Debug.Error("error, Transition None is not allowed for PerformTransition()");
            return;
        }
        let stateType: StateType = this.curState.GetOutputState(trans);
        if (stateType == StateType.None) {
            Debug.Error("error, state:" + this.curStateType + " does not have a target state for transition " + trans);
            return;
        }

        this.curStateType = stateType;
        for (let i = 0; i < this.states.Count; i++) {
            const element = this.states.GetAt(i);
            if (element.StateType == this.curStateType) {

                this.curState.DoBeforeLeaving();
                this.curState = element;
                this.curState.DoBeforeEntering();

                break;
            }
        }
    }


    public Update(dt: number): void {
        this.curState.Reason(dt);
        this.curState.Act(dt);
    }

}
