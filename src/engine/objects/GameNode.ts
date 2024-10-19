import {BaseGameObject} from "./BaseGameObject.ts";
import {NodeTree} from "../structures/node-tree";
import {GameNodeParams} from "../structures/game-node";

export class GameNode extends BaseGameObject implements NodeTree {
    public children: NodeTree[] = [];

    constructor({x, y, width, height}: GameNodeParams) {
        super(x, y, width, height);
    }

    public addChild(...children: NodeTree[]): void {
        if (children.length === 1) {
            this.children.push(children[0]);
            return;
        }

        this.children.push(...children);
    }

    public removeChild(child: NodeTree): void {
        const index = this.children.indexOf(child);

        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public removeChildOfType<T extends NodeTree>(type: new (...args: any[]) => T): void {
        this.children = this.children.filter(child => !(child instanceof type));
        this.children.forEach(child => child.removeChildOfType(type));
    }

    public update(): void {
        this.children.forEach(child => child.update());
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.children.forEach(child => child.draw(ctx));
    }

    public getChildByType<T extends NodeTree>(type: new (...args: any[]) => T): T | undefined {
        return this.children.find(child => child instanceof type) as T;
    }
}
