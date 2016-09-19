/**
 * Created by alexa on 18.09.2016.
 */
function Player(x,y)
{
    var textures = PIXI.loader.resources["assets/characters.json"].textures;
    this.runningFrames = [
        textures["run_1.png"],
        textures["run_2.png"],
        textures["run_3.png"]
    ];

    this.laddingFrames = [
        textures["ladder_1.png"],
        textures["ladder_2.png"]
    ];

    this.ropeFrames = [
        textures["rope_1.png"],
        textures["rope_2.png"],
        textures["rope_3.png"]
    ];

    this.positionX = x;
    this.positionY = y;
    this.view = new MovieClip(this.runningFrames);
    this.view.position.x = this.positionX;
    this.view.position.y = this.positionY;
    this.isDead = false;
    this.speed = 2;

    this.play();
}
Player.prototype = Object.create(null);
Player.constructor = Player;
Player.prototype.update = function()
{
    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;
};