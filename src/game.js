import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Alien from './alien'
import InputHandler from './input-handler'
import assetPath from '../assets/invaders.png'
import shipPath from '../assets/ship1.png'
import bunker from "./bunker";
import Rectangle from "./geometryObject/rectangle";
import {collisionWithBorders,CollisionDetector} from "./CollusionDetector";

let assets;
let ship;
const sprites = {
  aliens: [],
  cannon: null,
  bunker: null
};
export const gameState = {
  bullets: [],
  aliensBullets :[],
  aliens: [],
  cannon: null,
  bunker:[]
};
const inputHandler = new InputHandler();

export function preload(onPreloadComplete) {
    assets = new Image();
    ship = new Image();
	assets.addEventListener("load", () => {
    sprites.cannon = new Sprite(ship, 0, 0, 50, 42);
    sprites.aliens = [
      [new Sprite(assets,  0, 0, 22, 16), new Sprite(assets,  0, 16, 22, 16)],
			[new Sprite(assets, 22, 0, 16, 16), new Sprite(assets, 22, 16, 16, 16)],
			[new Sprite(assets, 38, 0, 24, 16), new Sprite(assets, 38, 16, 24, 16)]
    ]
        sprites.bunker = [
            [new Sprite(assets,  101, 0, 38, 29),
                new Sprite(assets, 144, 0, 38, 29),
                new Sprite(assets, 188, 0, 38, 29),
                new Sprite(assets, 226, 0, 38, 29)]
        ]

    onPreloadComplete();
  });
	assets.src = assetPath;
    ship.src = shipPath;
}

export function init(canvas) {
    const alienTypes = [1, 0, 1, 2, 0, 2];
    //const  alienTypes = [2]
	for (let i = 0, len = alienTypes.length; i < len; i++) {
		for (let j = 0; j < 10; j++) {
      const alienType = alienTypes[i];

      let alienX = 30 + j*30;
      let alienY = 30 + i*30;

      if (alienType === 1) {
        alienX += 3; // (kostyl) aliens of this type is a bit thinner
      }

			gameState.aliens.push(
                new Alien(alienX, alienY, sprites.aliens[alienType],0.2,0.2,alienType == 2? 5 :1 )
			);
		}
	}
    gameState.CanvasHeight = canvas.height;
	gameState.CanvasWidth = canvas.width;
    gameState.area = new Rectangle( 0,0,canvas.width,canvas.height);
	gameState.bunker.push( new bunker(100,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(200,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(300,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(400,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.cannon = new Cannon(
    100, canvas.height - 100,
    sprites.cannon
    );
}

export function update(time, stopGame) {

    //удаляем улетевшие пули
    for(let i = 0;i<gameState.bullets.length;i++) {
        if(gameState.bullets[i].y <= 0){
            gameState.bullets.splice(i,1);
        }
    }
    collisionWithBorders();
    CollisionDetector();
	if (inputHandler.isDown(37)) { // Left
		gameState.cannon.x -= 4;
	}

	if (inputHandler.isDown(39)) { // Right
		gameState.cannon.x += 4;
	}

  if (inputHandler.isPressed(32)) { // Space
    const bulletX = gameState.cannon.x + 10;
    const bulletY = gameState.cannon.y;
    gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#f5db5e"));
	}
    gameState.aliens.forEach(a=>a.update(time));
    gameState.bullets.forEach(b => b.update(time));

}

export function draw(canvas, time) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.aliens.forEach(a => a.draw(ctx, time));
  gameState.bunker.forEach(b=>b.draw(ctx))
  gameState.cannon.draw(ctx);
  gameState.bullets.forEach(b => b.draw(ctx));
}

