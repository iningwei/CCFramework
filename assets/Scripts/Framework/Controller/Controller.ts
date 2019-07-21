
import { WindowLayer } from "../Window/WindowLayer";
import { WindowModel } from "../Model/WindowModel";
import { WindowManager } from "../Window/WindowManager";

export class Controller {


    // private window: WindowX = null;
    // protected get Window(): WindowX {
    //     if (this.window == null) {
    //         this.window = WindowManager.Instance.GetOpenedWindow(this.windowModel.windowName);
    //     }
    //     return this.window;
    // }




    private windowModel: WindowModel = null;
    protected set WindowModel(windowModel: WindowModel) {
        this.windowModel = windowModel;
    }
    protected get WindowModel(): WindowModel {
        return this.windowModel;
    }



    public ShowWindow(layer: WindowLayer, isCache: boolean = false, datas: any[] = null) {
        WindowManager.Instance.Show(this.WindowModel.windowName, layer, isCache, datas);        
    }
    public CloseWindow() {
        WindowManager.Instance.Close(this.WindowModel.windowName);
    }
}
