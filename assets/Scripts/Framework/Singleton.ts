/**
 * Ts's singleton is too ugly.so i will not use it.
 */
export class Singleton<T>{
    private static instance: any = null;
    public static Instance<T>(c: { new(): T }): T {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }

    public Update(dt: number) {

    }
}
