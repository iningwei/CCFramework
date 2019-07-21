import { Controller } from "../../Framework/Controller/Controller";
import { BattleModel } from "./BattleModel";
import { WindowName } from "../../Framework/Window/WindowName";
import { WindowLayer } from "../../Framework/Window/WindowLayer";
import { WindowManager } from "../../Framework/Window/WindowManager";


export default class BattleController extends Controller {
    private static instance: BattleController = null;
    public static get Instance(): BattleController {
        if (this.instance == null) {
            this.instance = new BattleController();
        }
        return this.instance;
    }

    constructor() {
        super();
       this.WindowModel = new BattleModel(WindowName.BattleWindow);
    }

  

}
