import {GameNode} from "./GameNode.ts";

export abstract class GameObject extends GameNode {
    public isCollidingWith(other: GameObject): boolean {
        const bounds = this.getBounds();
        const otherBounds = other.getBounds();

        return bounds.x < otherBounds.x + otherBounds.width &&
               bounds.x + bounds.width > otherBounds.x &&
               bounds.y < otherBounds.y + otherBounds.height &&
               bounds.y + bounds.height > otherBounds.y;
    }

}