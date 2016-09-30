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
        tile,
        enemy;

    for (var i = 0; i < enemies.length; i++)
    {
        enemy = enemies[i];
        tile = map.getTileAt(enemy.positionX,enemy.positionY);
        if(tile.active == MAP_KEYS.RUNNER)
        {
            console.log("DIED!!!!!!!!!!!!!!!!!!!!");
        }
    }

    tile = map.getTileAt(player.positionX,player.positionY);
    if( tile.base == MAP_KEYS.GOLD &&
        ((!player.offsetX && player.offsetY >= 0 && player.offsetY < ENTITY_HEIGHT / 4) ||
            (!player.offsetY && player.offsetX >= 0 && player.offsetX < ENTITY_WIDTH / 4) ||
            (player.positionY < 15 && map.getTileAt(player.positionX,player.positionY + 1).base == MAP_KEYS.LADDER && player.offsetY < ENTITY_HEIGHT / 4)
        )
    )
    {
        console.log("PLAYER PICKED UP GOLD");
        this.engine.map.getTileAt(player.positionX,player.positionY).active = MAP_KEYS.EMPTY;
        this.engine.map.getTileAt(player.positionX,player.positionY).isChanged = true;
     }

};