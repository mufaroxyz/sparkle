import {GameNodeParams} from "./game-node.ts";

export interface LeafGameNodeParams extends Omit<GameNodeParams, 'final'> { }