/**
 * Created by alexa on 18.09.2016.
 */
GAME.PlayerManager = function(engine)
{
    Container.call( this );
    this.engine = engine;
    this.player = null;
};
GAME.PlayerManager.prototype = Object.create(Container.prototype);
GAME.PlayerManager.constructor = GAME.PlayerManager;
GAME.PlayerManager.prototype.initialize = function()
{
    var levelData = this.engine.gameLevelData;
    if (!levelData.hasOwnProperty(LEVEL_TILES.runner))
    {
        console.log("Error! No Player Data.WRONG LEVEL");
        return;
    }
    var cell = levelData[LEVEL_TILES.runner][0];
    this.player = new Player(cell.x, cell.y);

};