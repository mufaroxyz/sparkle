import {NodeManager} from "./NodeManager.ts";
import {Scene} from "./Scene.ts";
import {NodeTree} from "../structures/node-tree.ts";

type UScene = Scene & NodeTree;

export class SceneManager extends NodeManager {
    public children: UScene[] = [];
    public currentScene: UScene | null = null;

    constructor(width: number, height: number) {
        super(width, height);
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.currentScene) {
            this.currentScene.draw(ctx);
        }
    }

    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    public setScene(id: string) {
        const scene = this.getSceneById(id);
        if (scene) {
            this.currentScene = scene;
        }
    }

    public defineScenes(scenes: Record<string, Scene>) {
        this.children = Object.entries(scenes).map(([name, scene]) => {
            scene.id = name;
            return scene;
        });
    }

    public getSceneById(id: string): UScene | undefined {
        const children = this.children;
        return children.find((scene) => scene.id === id);
    }
}