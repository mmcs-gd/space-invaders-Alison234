import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Alien from './alien'
import InputHandler from './input-handler'

import assetPath from '../assets/invaders.png'
import bunker from "./bunker";
import cannon from "./cannon";

let assets;
let ship;
const sprites = {
  aliens: [],
  cannon: null,
  bunker: null
};
const gameState = {
  bullets: [],
  aliensBullents :[],
  aliens: [],
  cannon: null,
  bunker:[]
};
const inputHandler = new InputHandler();

export function preload(onPreloadComplete) {
  assets = new Image();

	assets.addEventListener("load", () => {
    sprites.cannon = new Sprite(assets, 62, 0, 34, 40);
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
}

export function init(canvas) {

    const alienTypes = [1, 0, 1, 2, 0, 2];
	for (let i = 0, len = alienTypes.length; i < len; i++) {
		for (let j = 0; j < 10; j++) {
      const alienType = alienTypes[i];

      let alienX = 30 + j*30;
      let alienY = 30 + i*30;

      if (alienType === 1) {
        alienX += 3; // (kostyl) aliens of this type is a bit thinner
      }

			gameState.aliens.push(
        new Alien(alienX, alienY, sprites.aliens[alienType])
			);
		}
	}
    gameState.CanvasHeight = canvas.height;
    gameState.CanvasWidth = canvas.width;
	gameState.bunker.push( new bunker(100,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(200,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(300,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    gameState.bunker.push( new bunker(400,canvas.height - 200,sprites.bunker[0],sprites.bunker[1],sprites.bunker[2],sprites.bunker[3]))
    console.log(gameState.bunker)
  gameState.cannon = new Cannon(
    100, canvas.height - 100,
    sprites.cannon
  );
}

function GetMaxAndMinXCoordinate(arr){
    let max = 0
    let MaxIndex = 0;
    let m = 2000
    let MinIndex = 0;
    for(let i =0;i<arr.length;i++){
        if(max <= arr[i].x){
            max = arr[i].x
            MaxIndex = i;
        }
        if(m >= arr[i].x){
            m = arr[i].x
            MinIndex = i;
        }
    }
    return [arr[MaxIndex],arr[MinIndex]]
}

function collisionWithBorders() {
    let [alienMax,alienMin] = GetMaxAndMinXCoordinate(gameState.aliens);
    //aliens отражаются от стен
    if(alienMax.x + 25 >= gameState.CanvasWidth)
        for(let i = 0 ; i<gameState.aliens.length;i++)
            gameState.aliens[i].vx = 1;
    if(alienMin.x <= 0)
        for(let i = 0 ; i<gameState.aliens.length;i++)
            gameState.aliens[i].vx = -1;

    //логика отображения пушки на canvas
    const cannonBorder = gameState.cannon.Boundary;

    if (gameState.cannon.x + cannonBorder.w / 2 >= gameState.CanvasWidth) {
        gameState.cannon.x = 50;
    }

    if (gameState.cannon.x - cannonBorder.w / 2 <= 0) {
        gameState.cannon.x = gameState.CanvasWidth - cannonBorder.w;
    }

    if (gameState.cannon.y  <= 0) {
        gameState.cannon.y = 5;
    }

    if (gameState.cannon.y  >= gameState.CanvasHeight - cannonBorder.h) {
        gameState.cannon.y = gameState.CanvasHeight - cannonBorder.h;
    }

}
export function update(time, stopGame) {

    //удаляем улетевшие пули
    for(let i = 0;i<gameState.bullets.length;i++){
        if(gameState.bullets[i].y <= 0){
            gameState.bullets.splice(i,1);
        }
    }
    collisionWithBorders();

	if (inputHandler.isDown(37)) { // Left
		gameState.cannon.x -= 4;
	}

	if (inputHandler.isDown(39)) { // Right
		gameState.cannon.x += 4;
	}

    if (inputHandler.isDown(38)) { // top
        gameState.cannon.y -= 4;
    }

    if (inputHandler.isDown(40)) { // bot
        gameState.cannon.y += 4;
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
  /*
  const backGround = new Image();
  backGround.src = "https://image.freepik.com/free-photo/stars-and-galaxy-outer-space-sky-night-universe-black-starry-background-of-shiny-starfield_146539-845.jpg";
  backGround.style.backgroundSize = "100%"
  ctx.drawImage(backGround,0,0,canvas.width,canvas.height)
    */
  gameState.aliens.forEach(a => a.draw(ctx, time));
  gameState.bunker.forEach(b=>b.draw(ctx))
  gameState.cannon.draw(ctx);
  gameState.bullets.forEach(b => b.draw(ctx));
}
