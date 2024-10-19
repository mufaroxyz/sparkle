import {GameObject} from "../../engine/objects/GameObject.ts";

export class Basket extends GameObject {
    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(): void {

    }
}