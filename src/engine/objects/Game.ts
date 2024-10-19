import {SceneManager} from "./SceneManager.ts";

export abstract class Game {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    public scenes = new SceneManager(0, 0);

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');

        if(!ctx) {
            throw new Error('Could not get 2d context');
        }

        this.scaleCanvas();

        this.context = ctx;
        this.context.imageSmoothingEnabled = true;
        this.scenes.width = this.getWidth();
        this.scenes.height = this.getHeight();
    }

    public scaleCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        console.log(rect, dpr);

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        const ctx = this.canvas.getContext('2d');

        if(ctx) {
            ctx.scale(dpr, dpr);
        }

        document.addEventListener('resize', () => {
            this.scaleCanvas();
        });
    }

    abstract update(): void;
    abstract draw(): void;

    public setAspectRatio(ratio: string) {
        this.canvas.style.aspectRatio = ratio;

        this.scaleCanvas();
    }

    public getHeight(): number {
        return this.canvas.height;
    }

    public getWidth(): number {
        return this.canvas.width;
    }

    public getCurrentSceneId() {
        return this.scenes.currentScene?.id;
    }

    public start(): void {
        this.loop();
    }

    private flushCanvas() {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }

    private loop() {
        this.flushCanvas();
        this.update();
        this.scenes.update();
        this.draw();
        this.scenes.draw(this.context);
        requestAnimationFrame(this.loop.bind(this));
    }
}