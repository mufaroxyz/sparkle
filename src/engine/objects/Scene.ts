import {GameNode} from "./GameNode.ts";

export class Scene extends GameNode {
    public id: string = "";

    draw(ctx: CanvasRenderingContext2D) {
        this.children.forEach(child => {
            child.draw(ctx);
        });
    }

    update() {
        this.children.forEach(child => child.update());
    }
}