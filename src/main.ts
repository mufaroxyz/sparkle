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

const scene1 = new Scene({
    x: 0,
    y: 0,
    width: game.getWidth(),
    height: game.getHeight(),
});

const scene2 = new Scene({
    x: 0,
    y: 0,
    width: game.getWidth(),
    height: game.getHeight(),
});

scene2.addChild(new Basket({
    x: game.getWidth() / 2 - BASKET_WIDTH / 2,
    y: 50,
    width: BASKET_WIDTH,
    height: 10,
}));

game.scenes.defineScenes({
    "root": scene1,
    "game": scene2,
})

game.scenes.setScene("root")
game.start();

setTimeout(() => {
    if (game.getCurrentSceneId() === "root") {
        game.scenes.setScene("game");
    } else {
        game.scenes.setScene("root");
    }
}, 3000);