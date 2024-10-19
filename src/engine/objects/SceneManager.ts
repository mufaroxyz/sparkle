import {NodeManager} from "./NodeManager.ts";
import {Scene} from "./Scene.ts";
import {NodeTree} from "../structures/node-tree.ts";
import {ImGui} from "@zhobo63/imgui-ts";

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

    public ImGetActiveIndex(): ImGui.ImScalar<number> {
        if (!this.currentScene) {
            return [0];
        }
        return [ this.children.indexOf(this.currentScene) ];
    }

    public ImSetActiveIndex(index: ImGui.ImScalar<number>) {
        console.log("ImGui: Updating active element to, ", index[0]);
        this.currentScene = this.children[index[0]];
        console.log("ImGui: Updated active element to, ", this.currentScene);
    }

    public getSceneNames() {
        return this.children.map(scene => scene.id);
    }
}