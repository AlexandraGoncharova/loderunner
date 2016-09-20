/**
 * Created by alexa on 18.09.2016.
 */
GAME.EnemiesManager = function (engine)
{
    Container.call( this );
    this.engine = engine;
};
GAME.EnemiesManager.prototype = Object.create(Container.prototype);
GAME.EnemiesManager.constructor = GAME.EnemiesManager;
GAME.EnemiesManager.prototype.initialize = function()
{
    var levelData = this.engine.gameLevelData;
    var keys = Object.getOwnPropertyNames(levelData);
    if (keys.indexOf("guard") == -1)
    {
        console.log("Error! No Enemies Data.WRONG LEVEL");
        return;
    }
    var cells = levelData["guard"];
    var len = cells.length,
        sprite,
        i;
    for (i = len - 1; i >= 0; i--)
    {

    }
};