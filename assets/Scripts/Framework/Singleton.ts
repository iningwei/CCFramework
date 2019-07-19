
export class Singleto<T>{
    private   instance:T=null;
    public   get Instance():T{
        return this.instance;
    }

}
