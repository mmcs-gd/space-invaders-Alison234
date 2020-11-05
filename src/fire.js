import sprite from "./sprite";
import firePath from '../assets/fire.png'

let f = new Image();
f.src = firePath;

let fire = new sprite(f,0,0,20,20)

export default class Fire {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
     draw(ctx){
         ctx.drawImage(
             fire.img,
             fire.x, fire.y, fire.w, fire.h,
             this.x, this.y, fire.w, fire.h
         );
    }

}