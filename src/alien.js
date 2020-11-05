import Rectangle from "./geometryObject/rectangle";
import Point from "./geometryObject/Point";
import sprite from "./sprite";
import {gameState} from "./game";
import Bullet from "./bullet";
import AlienBullet from "./AlienBullet";


export default class Alien {
  constructor(x, y, [spriteA, spriteB], vy = 0.5, vx = 0.5, hp = 1,typeOfFire = 0) {
    this.x = x;
    this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    this.vy = vy;
    this.vx = vx;
    this.hp = hp;
    this.typeOfFire =typeOfFire;
  }


  get Boundary() {
    let [boundaryWidth, boundaryHeight] = this._spriteA.size;
    return new Rectangle(this.x, this.y, boundaryWidth, boundaryHeight);
  }

  update(time) {
    if (Math.round(time) % 2 === 0) {
      this.y += this.vy;
      return;
    }
    this.x -= this.vx;
  }


  AlienFire(){
    if(this.typeOfFire === 1 ){
      let angel = -0.5;
      for(let i  = 0;i<7;i++) {
        angel +=0.1;
        gameState.aliensBullets.push(new AlienBullet(this.x + 15, this.y + 2, 1, angel, "#cf670a"))
      }
    }
    if(this.typeOfFire == 2){
      let vx = Math.sin(this.x - gameState.cannon.x)
      gameState.aliensBullets.push(new AlienBullet(this.x + 15, this.y + 2, 5,vx , "#1cdaf3"))
    }

  }

  center() {
    let [w, h] = this._spriteA.size;
    return new Point(this.x + w / 2, this.y + h / 2, this)
  }

  draw(ctx, time) {
    let sp = (Math.ceil(time / 1000) % 2 === 0) ? this._spriteA : this._spriteB;
    //this.Boundary.draw(ctx)
    ctx.drawImage(
        sp.img,
        sp.x, sp.y, sp.w, sp.h,
        this.x, this.y, sp.w, sp.h
    );
    }
}


