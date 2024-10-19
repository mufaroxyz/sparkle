import {BaseGameObject} from "./BaseGameObject.ts";
import {NodeTreeLeaf} from "../structures/node-tree.ts";
import {LeafGameNodeParams} from "../structures/leaf-game-node.ts";

export abstract class LeafGameNode extends BaseGameObject implements NodeTreeLeaf {
    public readonly children: undefined = undefined;

    constructor({x, y, width, height}: LeafGameNodeParams) {
        super(x, y, width, height);

        Object.setPrototypeOf(this, LeafGameNode.prototype);
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;
}