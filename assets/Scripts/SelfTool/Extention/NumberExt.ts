export default class NumberExt {

    /**
    * change seconds to HMS format
    * @param seconds 
    */
    public static ToHMS(seconds: number): string {
        let h: number = Math.floor(seconds / 3600);
        let m: number = Math.floor((seconds - h * 3600) / 60);
        let s: number = (seconds - h * 3600 - m * 60);
        return ("00" + h).substr(-2) + ":" + ("00" + m).substr(-2) + ":" + ("00" + s).substr(-2);
    }
}