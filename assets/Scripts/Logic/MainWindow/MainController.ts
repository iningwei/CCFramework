import { Controller } from "../../Framework/Controller/Controller";
import { MainModel } from "./MainModel";
import { WindowName } from "../../Framework/Window/WindowName";

export class MainController extends Controller {
    private static instance: MainController = null;
    public static get Instance(): MainController {
        if (this.instance == null) {
            this.instance = new MainController();
        }
        return this.instance;
    }


    constructor() {
        super();
        this.WindowModel = new MainModel(WindowName.MainWindow);
    }
}
