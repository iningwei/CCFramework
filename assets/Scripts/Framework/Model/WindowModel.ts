import { Model } from "./Model";
import { WindowName } from "../Window/WindowName";


export class WindowModel extends Model {

    constructor(public windowName: WindowName) {
        super();

    }

}
