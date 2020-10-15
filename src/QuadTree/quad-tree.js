import Rectangle from './rectangle'
import Point from "./Point";

export default class QuadTree {
    constructor(boundary, capacity = 4) {
        if (!boundary) {
            throw TypeError('boundary is null or undefined')
        }

        if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle')
        }

        this._points = []
        this._boundary = boundary
        this._capacity = capacity
        this._hasChildren = false
        this._children = []
    }

    insert(point) {
        if(!this._boundary.contains(point)) return
        if(this._points.length < this._capacity){
            this._points.push(point)
            return
        }
        if(!this._hasChildren){
            this._subdivide()
        }
        this._children.forEach(quad =>quad.insert(point))
    }

    get length() {
        let count = this._points.length
        if (this._hasChildren) {
            for (let child of this._children){
                count += child.length
            }
        }
        return count
    }

    queryRange(rect, found = []) {
        const { _boundary: bound, _points: pts, _children: children } = this;
        if (!rect.intersects(bound)) {
            return found;
        }

        for (const p of pts) {
            if (rect.contains(p)) {
                //console.log("contains point", p);
                found.push(p);
            }
        }
        if (this._hasChildren) {
            children.forEach(child => child.queryRange(rect, found));
        }
        return found
    }


    _subdivide() {
        const {x,y,w,h} = this._boundary
        const quadCoords=[
            new Point(x,y),
            new Point(x+w/2,y),
            new Point(x,y+h/2),
            new Point(x+w/2,y+h/2),
        ]
        this._children = quadCoords.map(({x,y}) => new Rectangle(x,y,w/2,h/2))
            .map(rect => new QuadTree(rect,this._capacity))
        this._hasChildren = true
    }

    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._points = []
        this._children = []
        this._hasChildren = false
    }
}
