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
    if (!levelData.hasOwnProperty(LEVEL_TILES.guard))
    {
        console.log("Error! No Enemies Data.WRONG LEVEL");
        return;
    }
    var cells = levelData[LEVEL_TILES.guard];
    var len = cells.length,
        sprite,
        i;
    for (i = len - 1; i >= 0; i--)
    {

    }
};