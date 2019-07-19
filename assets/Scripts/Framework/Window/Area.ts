/**
 * Area是对Window的拆解，把Window的逻辑按Area块拆开
 * 
 */
export class Area {
    constructor(public node: cc.Node, public window: Window) {
        this.Init();
    }
    public Init() {
        this.LinkUI();
        this.AddUIEventListener();
    }

    protected LinkUI() {
    }
    public AddUIEventListener() {

    }
    public RemoveUIEventListener() {
    }

    public Show() {
        this.node.active = true;
    }
    public Hide() {
        this.node.active = false;
    }
    
    public Update(dt: number) {

    }
}
