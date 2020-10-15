export default class  Straight{
    constructor(ax,ay,bx,by) {
        this.ax = ax
        this.bx = bx
        this.ay = ay
        this.by = by
    }

    draw(context){
        context.beginPath();
        context.moveTo(this.ax, this.ay);
        context.lineTo(this.bx, this.by);
        context.stroke();
    }

    intersects(another){
        let x1 = this.ax;
        let y1 = this.ay;
        let x2 = this.bx;
        let y2 = this.by;
        let x3 = another.ax;
        let y3 = another.ay;
        let x4 = another.bx;
        let y4 = another.by;
        let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        let  uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1
    }
}