/**
 * Created by alexa on 18.09.2016.
 */
GAME.GameView = function()
{
    this.renderer = autoDetectRenderer(960, 800);
    this.stage = new Container();

    this.gameScene = new Container();
    this.stage.addChild(this.gameScene);
};
GAME.GameView.prototype.initialize = function ()
{

};
GAME.GameView.prototype.update = function ()
{
    this.renderer.render(this.stage);
};