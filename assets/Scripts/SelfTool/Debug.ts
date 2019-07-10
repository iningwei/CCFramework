export default class Debug {
    public static showLog: boolean = true;

    public static Log(message: any,forceShow:boolean=false): void {
        if (this.showLog||forceShow) {
            console.log(message);
        }
    }
    public static Warn(message: any,forceShow:boolean=false): void {
        if (this.showLog||forceShow) {
            console.warn(message);
        }
    }

    public static Error(message: any,forceShow:boolean=false): void {
        if (this.showLog||forceShow) {
            console.error(message);
        }
    }    
}
