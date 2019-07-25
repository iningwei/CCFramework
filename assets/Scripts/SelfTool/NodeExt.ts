
export class NodeExt {

    /**
     * 从目标节点及其子孙节点中找到满足`name`的节点
     * @param targetNode 
     * @param name 
     */
    public static Search(targetNode: cc.Node, name: string): cc.Node {
        if (targetNode.name == name) {
            return targetNode;
        }
        
        for (let i = 0; i < targetNode.children.length; i++) {
            const child = targetNode.children[i];
            let result = this.Search(child, name);
            if (result != null) {
                return result;
            }
        }

        return null;
    }


    //error!!! TODO
    public static FindChildByName(targetNode: cc.Node, name: string): cc.Node {
        for (let i = 0; i < targetNode.children.length; i++) {
            const child = targetNode[i];
            if (child.name == name) {
                return child;
            }
            else {
                let result = this.FindChildByName(child, name);
                if (result != null) {
                    return result;
                }
            }
        }

        return null;
    }

    /**
     * 根据具体路径获得子物体，路径用/分割
     * @param targetNode 
     * @param path 
     */
    public static GetChildByPath(targetNode: cc.Node, path: string) {
        let names = path.split('/');
        let target = targetNode.getChildByName(names[0]);
        if (target == null) {
            return null;
        }

        for (let i = 1; i < names.length; i++) {
            const element = names[i];
            target = target.getChildByName(element);
        }
        return target;
    }
}
