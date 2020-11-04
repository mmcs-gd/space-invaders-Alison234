import {gameState} from "./game";
import QuadTree from "./quad-tree";
import Rectangle from "./geometryObject/rectangle";
import Bullet from "./bullet";
import Alien from "./alien";

function GetMaxAndMinXCoordinate(arr){
    let max = 0
    let MaxIndex = 0;
    let m = 2000
    let MinIndex = 0;
    for(let i =0;i<arr.length;i++){
        if(max <= arr[i].x){
            max = arr[i].x
            MaxIndex = i;
        }
        if(m >= arr[i].x){
            m = arr[i].x
            MinIndex = i;
        }
    }
    return [arr[MaxIndex],arr[MinIndex]]
}

export function collisionWithBorders() {
    let [alienMax,alienMin] = GetMaxAndMinXCoordinate(gameState.aliens);
    //aliens отражаются от стен
    if(alienMax.x + 25 >= gameState.CanvasWidth)
        for(let i = 0 ; i<gameState.aliens.length;i++)
            gameState.aliens[i].vx = 1;
    if(alienMin.x <= 0)
        for(let i = 0 ; i<gameState.aliens.length;i++)
            gameState.aliens[i].vx = -1;

    //логика отображения пушки на canvas
    const cannonBorder = gameState.cannon.Boundary;

    if (gameState.cannon.x + cannonBorder.w / 2 >= gameState.CanvasWidth) {
        gameState.cannon.x = 50;
    }

    if (gameState.cannon.x - cannonBorder.w / 2 <= 0) {
        gameState.cannon.x = gameState.CanvasWidth - cannonBorder.w;
    }

    if (gameState.cannon.y  <= 0) {
        gameState.cannon.y = 5;
    }

    if (gameState.cannon.y  >= gameState.CanvasHeight - cannonBorder.h) {
        gameState.cannon.y = gameState.CanvasHeight - cannonBorder.h;
    }

}



export function CollisionDetector(){

    let tree = new QuadTree(gameState.area)
    let points = []
    for(let bullet of gameState.bullets)
        points.push(bullet.center())
    for(let bullet of gameState.aliens)
        points.push(bullet.center())
    for(let bullet of gameState.bunker)
        points.push(bullet.center())
    for(let bullet of gameState.aliensBullets)
        points.push(bullet.center())
    points.push(gameState.cannon.center())
    points.forEach(p=>tree.insert(p))

    for (let i = 0;i< points.length;i++) {
        let candidates =[]
        const len = 10
        const bounds = new Rectangle(points[i].x-10, points[i].y-10, len, len)
        tree.queryRange(bounds, candidates)
        for (let other of candidates) {

            //пуля с врагом
            if(other.obj instanceof Bullet && points[i].obj instanceof Alien){
                if(points[i].obj.Boundary.intersects(other.obj.Boundary)) {
                    points[i].obj.hp--;
                    gameState.bullets.splice(gameState.bullets.indexOf(other.obj),1);
                    if(points[i].obj.isDead)
                        gameState.aliens.splice(gameState.aliens.indexOf(points[i].obj),1);

                }
            }
            //враг с пулей
            if(other.obj instanceof Alien && points[i].obj instanceof Bullet){
                if(points[i].obj.Boundary.intersects(other.obj.Boundary)) {
                    other.obj.hp--;
                    gameState.bullets.splice(gameState.bullets.indexOf(points[i].obj),1);
                    if(other.obj.isDead)
                        gameState.aliens.splice(gameState.aliens.indexOf(other.obj),1);

                }
            }

            }
    }
}
