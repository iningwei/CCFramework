import { Controller } from "../../Framework/Controller/Controller";
import { DebugModel } from "./DebugModel";
import { WindowName } from "../../Framework/Window/WindowName";


export class DebugController extends Controller {
    private static instance: DebugController = null;
    public static get Instance(): DebugController {
        if (this.instance == null) {
            this.instance = new DebugController();
        }
        return this.instance;
    }


    constructor() {
        super();
        this.WindowModel = new DebugModel(WindowName.DebugWindow);
    }

}
