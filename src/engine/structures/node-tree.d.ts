export interface NodeTree {
    children: NodeTree[];
    addChild(...children: NodeTree[]): void;
    removeChild(child: NodeTree): void;
    removeChildOfType<T extends NodeTree>(type: new (...args: any[]) => T): void;
    update(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    getChildByType<T extends NodeTree>(type: new (...args: any[]) => T): T | undefined;
}

export interface NodeTreeLeaf extends Omit<NodeTree, 'addChild' | 'removeChild' | 'removeChildOfType' | 'getChildByType'> {
    readonly children: undefined;
}