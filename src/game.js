import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Alien from './alien'
import InputHandler from './input-handler'
import assetPath from '../assets/invaders.png'
import HpPath from '../assets/hp.png'
import shipPath from '../assets/ship1.png'
import bunker from "./bunker";
import Rectangle from "./geometryObject/rectangle";
import {collisionWithBorders,CollisionDetector} from "./CollusionDetector";
import alien from "./alien";

let sc= document.getElementById("score")

let assets;
let ship;
let hpImage;
let gameTime = 0;
const sprites = {
  aliens: [],
  cannon: null,
  bunker: null,
};
export const gameState = {
  bullets: [],
  aliensBullets :[],
  aliens: [],
  cannon: null,
  bunker:[],
    fire:[],
    TotalScore : 0,
};
const inputHandler = new InputHandler();



export function preload(onPreloadComplete) {
    assets = new Image();
    ship = new Image();

	assets.addEventListener("load", () => {
    sprites.cannon = new Sprite(ship, 0, 0, 31, 30);
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
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) + min);
}

function createNewAliens(){
    gameState.aliens = [];
    let alienTypes = []
    for(let i = 0;i < 6;i++){
        alienTypes.push(getRandomIntInclusive(0,1));
    }
    for (let i = 0, len = alienTypes.length; i < len; i++) {
        for (let j = 0; j < 10; j++) {
            const alienType = alienTypes[i];
            let alienX = 30 + j*30;
            let alienY = 30 + i*30;

            if (alienType === 1) {
                alienX += 3; // (kostyl) aliens of this type is a bit thinner
            }
            gameState.aliens.push(
                new Alien(alienX, alienY, sprites.aliens[alienType],0.2,0.2,alienType == 2 ? 5 :1,alienType == 0 ? 1 :2 )
            );
        }
    }

}

function  drawHp(ctx,canvas){

    hpImage = new Image();
    hpImage.src = HpPath;
    let x = 0;
    console.log(gameState.cannon.hp);
    for (let  i = 0 ; i < gameState.cannon.hp;i++){
        ctx.drawImage(hpImage,
        x, canvas.height-50, 20, 20,)
        x+= 30;

    }

}

export function init(canvas) {


    createNewAliens();
    gameState.TotalScore = 0;
    gameState.aliensBullets = [];
    gameState.bullets = [];
    gameState.CanvasHeight = canvas.height;
    gameState.ImproveSpeed = false;
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
    setInterval(updateTime, 500);
}

function updateTime()
{
    gameTime++;

    if(gameTime % 2 == 0){
        gameState.aliens[getRandomIntInclusive(0,gameState.aliens.length-2)].AlienFire();
    }
}


export function update(time, stopGame) {


    sc.innerText = "Score " + gameState.TotalScore;
    if(gameState.aliens.length == 0){
        createNewAliens();
    }
    if((Math.ceil(time / 100) % 2 === 0)){
        gameState.fire = [];
    }
    //удаляем улетевшие пули
    for(let i = 0;i<gameState.bullets.length;i++) {
        if(gameState.bullets[i].y <= 0){
            gameState.bullets.splice(i,1);
        }
    }

    for(let i = 0; i < gameState.aliensBullets.length;i++) {
        if(gameState.aliensBullets[i].y >= gameState.area.h
            ||  gameState.aliensBullets[i].x >= gameState.area.w
            ||  gameState.aliensBullets[i].x <= 0){
            gameState.aliensBullets.splice(i,1);
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
      const bulletX = gameState.cannon.x + 20;
      const bulletY = gameState.cannon.y;
      gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#f5db5e"));
  }
    gameState.aliens.forEach(a=>a.update(time));
    gameState.bullets.forEach(b => b.update(time));
    gameState.aliensBullets.forEach(b => b.update(time));

}

export function draw(canvas, time) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.aliens.forEach(a => a.draw(ctx, time));
  gameState.bunker.forEach(b=>b.draw(ctx))
  gameState.cannon.draw(ctx);
  gameState.bullets.forEach(b => b.draw(ctx));
  gameState.aliensBullets.forEach(b => b.draw(ctx));
  gameState.fire.forEach( f=> f.draw(ctx));
  drawHp(ctx,canvas);
}

