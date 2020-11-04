import Rectangle from "./geometryObject/rectangle";
import Point from "./geometryObject/Point";

export default class Bullet {
  constructor(x, y, vy, w, h, color) {
    this.x = x;
  	this.y = y;
  	this.vy = vy;
  	this.w = w;
  	this.h = h;
  	this.color = color;
  }

  get Boundary(){
        return new Rectangle(this.x,this.y,this.w,this.h);
    }

    center() {
        return new Point(this.x + this.w / 2, this.y + this.h / 2, this)
    }

  update(time) {
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
  	ctx.fillRect(this.x, this.y, this.w, this.h);
  }

}
