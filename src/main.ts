import './style.css'
import {getElement} from "./engine/functions/dom-lib.ts";
import {MyGame} from "./game/Root.ts";
import {Basket} from "./game/Objects/Basket.ts";
import {Scene} from "./engine/objects/Scene.ts";
import {mountCanvasDevTools} from "./engine/devtools/CanvasDevTools.ts";

const canvasElement = getElement<HTMLCanvasElement>('#game')

if("error" in canvasElement) {
    throw new Error(canvasElement.error);
}

const BASKET_WIDTH = 60;

const game = new MyGame(canvasElement);
mountCanvasDevTools(game);

const startScene = new Scene(game.getWidth(), game.getHeight());
const gameScene = new Scene(game.getWidth(), game.getHeight());

gameScene.addChild(new Basket({
    x: game.getWidth() / 2 - BASKET_WIDTH / 2,
    y: 50,
    width: BASKET_WIDTH,
    height: 10,
}));

game.scenes.defineScenes({
    "start": startScene,
    "game": gameScene,
})

game.scenes.setScene("start")
game.start();