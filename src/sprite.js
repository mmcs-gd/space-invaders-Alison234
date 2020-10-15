import rectangle from "./geometryObject/rectangle";

export default class Sprite {
  constructor(img, x, y, w, h) {
    this.img = img;
  	this.x = x;
  	this.y = y;
  	this.w = w;
  	this.h = h;
  }
  get size(){
  	return  [this.w,this.h];
  }

  get width(){
      return this.w;
  }

  get height(){
      return this.h;
  }

  get image(){
      return this.img;
  }

}
