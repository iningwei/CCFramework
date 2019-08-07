import { FSMSystem } from "../FSMSystem";

export class Role {
    public node: cc.Node = null;
    fsmSystem: FSMSystem = new FSMSystem();

    constructor(_node: cc.Node) {
        this.node = _node;
    }


    protected InitFSMSystem() {

    }

    protected Update(dt: number): void {
        this.fsmSystem.Update(dt);
    }


    public OnDestroy() {

    }
}
