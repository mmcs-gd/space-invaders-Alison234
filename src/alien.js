import Rectangle from "./geometryObject/rectangle";

export default class Alien {
  constructor(x, y, [spriteA, spriteB],vy=1,vx=1) {
    this.x = x;
  	this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    this.vy = vy;
    this.vx = vx;
  }

  get Boundary(){
    let [boundaryWidth,boundaryHeight] = this._spriteA.size;
    return new Rectangle(this.x,this.y,boundaryWidth,boundaryHeight);
  }

  update(time){
    if(Math.round(time)  % 2 === 0) {
      this.y +=  this.vy;
      return;
    }
    this.x -= this.vx;
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
