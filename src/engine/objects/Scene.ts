import {GameNode} from "./GameNode.ts";

export class Scene extends GameNode {
    public id: string = "";

    constructor(width: number, height: number) {
        super({
            x: 0,
            y: 0,
            width,
            height
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.children.forEach(child => {
            child.draw(ctx);
        });
    }

    update() {
        this.children.forEach(child => child.update());
    }
}