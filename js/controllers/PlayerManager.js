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
    if (!levelData.hasOwnProperty("runner"))
    {
        console.log("Error! No Player Data.WRONG LEVEL");
        return;
    }
    var cell = levelData["runner"][0];
    this.player = new Player(cell.x, cell.y);
    this.addChild(this.player.view);
};
GAME.PlayerManager.prototype.updateTransform = function()
{
    if(GAME.Controls.pressed(GAME.Controls.UP)) {
        //jump || move up by ladder
    } else if(GAME.Controls.pressed(GAME.Controls.DOWN)) {
        // move down ladder or fall
    } else if(GAME.Controls.pressed(GAME.Controls.LEFT)) {
        this.player.update();
    } else if(GAME.Controls.pressed(GAME.Controls.RIGHT)) {
        this.player.update();
    } else {
        //
    }

    Container.prototype.updateTransform.call(this);
};