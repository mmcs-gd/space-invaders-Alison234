import Rectangle from "./geometryObject/rectangle";
import Point from "./geometryObject/Point";

export default class AlienBullet{
    constructor(x, y, vy, vx, color) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.vx = vx
        this.color = color;
    }

    get Boundary(){
        return new Rectangle(this.x-4,this.y-4,8,8);
    }

    center() {
        return new Point(this.x + 1, this.y + 1, this)
    }

    update(time) {
        this.y += this.vy;
        this.x += this.vx;
    }

    draw(ctx) {
        this.Boundary.draw(ctx)
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

}
