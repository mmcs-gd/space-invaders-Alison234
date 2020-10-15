import Rectangle from "./geometryObject/rectangle";

export default class bunker{
    constructor(x,y,[spriteA,spriteB,spriteC,spriteD],strength = 100) {
        this.x = x;
        this.y = y;
        this._spriteA = spriteA;
        this._spriteB = spriteB;
        this._spriteC = spriteC;
        this._spriteD = spriteD;
        this.strength = strength
    }

    get Boundary(){
        let [boundaryWidth,boundaryHeight] = this._spriteA.size;
        return new Rectangle(this.x,this.y+3,boundaryWidth,boundaryHeight-2);
    }

    draw(ctx){
        //this.Boundary.draw(ctx)
        let sp;
        if(this.strength === 100) sp = this._spriteA;
        if(this.strength === 75) sp = this._spriteB;
        if(this.strength === 50) sp = this._spriteC;
        if(this.strength === 25) sp = this._spriteD;
        //this.Boundary.draw(ctx)
        ctx.drawImage(
            sp.img,
            sp.x, sp.y, sp.w, sp.h,
            this.x, this.y, sp.w, sp.h
        );
    }
    }

