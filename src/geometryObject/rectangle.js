import Point from "./Point";
import Straight from "./Straight";

export default class Rectangle {
    constructor(x, y, w, h) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
    }


    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }


    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    center() {
        return new Point(this.x + this.w / 2, this.y + this.h / 2, this)
    }

    getStraights(fig) {
        let st = []
        st.push(new Straight(fig.x, fig.y, fig.x + fig.w, fig.y))
        st.push(new Straight(fig.x + fig.w, fig.y, fig.x + fig.w, fig.y + fig.h))
        st.push(new Straight(fig.x + fig.w, fig.y + fig.h, fig.x, fig.y + fig.h))
        st.push(new Straight(fig.x, fig.y + fig.h, fig.x - fig.h))
        return st
    }

    intersects(fig) {
        if (fig instanceof Rectangle) {
            return (this.x < fig.x + fig.w)
                && (fig.x < this.x + this.w)
                && (this.y < fig.y + fig.h)
                && (fig.y < this.y + this.w)
        }
    }
}