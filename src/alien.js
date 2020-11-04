import Rectangle from "./geometryObject/rectangle";
import Point from "./geometryObject/Point";
import sprite from "./sprite";
import firePath from '../assets/fire.png'
import {gameState} from "./game";

let fire = new sprite(new Image().src = "../assets/fire.png",0,0,20,20)

export default class Alien {
  constructor(x, y, [spriteA, spriteB], vy = 0.5, vx = 0.5, hp = 1, isDead = false) {
    this.x = x;
    this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    this.vy = vy;
    this.vx = vx;
    this.hp = hp;
    this.isDead = isDead;
  }


  get Boundary() {
    let [boundaryWidth, boundaryHeight] = this._spriteA.size;
    return new Rectangle(this.x, this.y, boundaryWidth, boundaryHeight);
  }

  update(time) {
    if(this.hp == 0){
      this.isDead = true;
    }
    if (Math.round(time) % 2 === 0) {
      this.y += this.vy;
      return;
    }
    this.x -= this.vx;
  }

  center() {
    let [w, h] = this._spriteA.size;
    return new Point(this.x + w / 2, this.y + h / 2, this)
  }

  draw(ctx, time) {
    if (!this.isDead) {
      let sp = (Math.ceil(time / 1000) % 2 === 0) ? this._spriteA : this._spriteB;

    //this.Boundary.draw(ctx)
    ctx.drawImage(
        sp.img,
        sp.x, sp.y, sp.w, sp.h,
        this.x, this.y, sp.w, sp.h
    );}
    else{
      let im = new Image();
      im.src = firePath;
      ctx.drawImage(
          im,
          0, 0, 20, 19,
          this.x, this.y, 20, 19
      )
    }
  }
}


