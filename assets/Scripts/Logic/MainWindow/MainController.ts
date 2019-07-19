import { Controller } from "../../Framework/Controller/Controller";
import { MainWindow } from "./MainWindow";
import { MainModel } from "./MainModel";
import { WindowModel } from "../../Framework/Model/WindowModel";
import { WindowName } from "../../Framework/Window/WindowName";
import { WindowLayer } from "../../Framework/Window/WindowLayer";
import { WindowManager } from "../../Framework/Window/WindowManager";


export class MainController extends Controller {
    private static instance: MainController = null;
    public static get Instance(): MainController {
        if (this.instance == null) {
            this.instance = new MainController();
        }
        return this.instance;
    }


    private constructor() {
        super();
        this.WindowModel = new MainModel(WindowName.MainWindow);
    }
}
