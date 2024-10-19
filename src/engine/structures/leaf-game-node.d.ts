import {GameNodeParams} from "./game-node";

export interface LeafGameNodeParams extends Omit<GameNodeParams, 'final'> { }