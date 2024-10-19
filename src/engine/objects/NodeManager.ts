import {GameNode} from "./GameNode.ts";

export class NodeManager extends GameNode {
    constructor(width: number, height: number) {
        super({
            x: 0,
            y: 0,
            width,
            height
        });
    }
}