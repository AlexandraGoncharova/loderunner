/**
 * Created by alexa on 18.09.2016.
 */
GAME.CollisionManager = function(engine) {
    this.engine = engine;
};
GAME.CollisionManager.prototype = Object.create(null);
GAME.CollisionManager.constructor = GAME.CollisionManager;
GAME.CollisionManager.prototype.checkCollision= function()
{
    var enemies =this.engine.enemiesManager.enemies,
        map =this.engine.map,
        player = this.engine.playerManager.player,
        i = enemies.length - 1;

    /*while(i--) {
        if(enemies[i].visible) {
            var a = bM.length;
            while(a--) { //test with bullet
                if(bM[a].visible) {
                    if(eM[i].hitArea.contain(bM[a].position)) {
                        eM[i].touched(bM[a]);
                        bM[a].canRealloc();
                        this.dispatchEvent('ENEMY_TOUCHED');
                        //console.log('ENEMY TOUCHED');
                    }
                }
            }
            if(this.ship.visible && eM[i].hitArea.intersectWith(this.ship.hitArea)) {
                eM[i].canRealloc();
                this.ship.hitEnnemy();
                this.dispatchEvent('TOUCH_ENEMY');
            }


        }
    }*/
};