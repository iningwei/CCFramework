
export class NodeExt {

    /**
     * 从子节点（支持子节点的子节点）中找到第一个名字匹配的节点
     * 如果没有找到的话，返回undefined
     * @param targetNode 
     * @param name 
     */
    public static GetChildByName(targetNode: cc.Node, name: string): cc.Node {
        let childs = targetNode.children;
        for (let i = 0; i < childs.length; i++) {
            const element = childs[i];
            if (element.name == name) {
                return element;
            }
            else {
                NodeExt.GetChildByName(element, name);
            }
        }
    }

    /**
     * 根据具体路径获得子物体，路径用/分割
     * @param targetNode 
     * @param path 
     */
    public static GetChildByPath(targetNode: cc.Node, path: string) {
        let names = path.split('/');
        let target = targetNode.getChildByName(names[0]);
        for (let i = 1; i < names.length; i++) {
            const element = names[i];
            target = target.getChildByName(element);
        }
        return target;
    }
}
