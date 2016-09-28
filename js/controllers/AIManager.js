/**
 * Created by a.goncharova on 28.09.2016.
 */
GAME.AIManager = function (engine)
{
    this.engine = engine;
};
GAME.AIManager.prototype = Object.create(null);
GAME.AIManager.constructor = GAME.AIManager;
GAME.AIManager.move = function(enemy)
{
    var x = enemy.positionX,
        y = enemy.positionY,
        offsetX = enemy.offsetX,
        offsetY = enemy.offsetY


        
};