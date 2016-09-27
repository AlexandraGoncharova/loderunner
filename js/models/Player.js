/**
 * Created by alexa on 18.09.2016.
 */
function Player(x,y)
{
    Entity.call(this);
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

    this.walkFrames = [
        textures["walk_1.png"],
        textures["walk_2.png"]
    ];

    this.positionX = x;
    this.positionY = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.nextTextures = [];
    this.view = new MovieClip(this.runningFrames);
    this.view.scale.set(ENTITY_HEIGHT * GAME_SCALE / this.view.height);
    this.view.position.x = this.positionX * this.view.width;
    this.view.position.y = this.positionY * this.view.height;
    this.view.anchor.set(0);

    this.isDead = false;
    this.speed = 0.1;
    this.view.animationSpeed = 0.1;
    this.view.play();
}
Player.prototype = Object.create(Entity.prototype);
Player.constructor = Player;
Player.prototype.update = function() {
   // this.positionX += this.speed;
    if (this.nextTextures.length > 0)
    {
        this.view.textures = this.nextTextures;
        this.nextTextures = [];
    }
    //console.log(this.offsetX * GAME_SCALE,this.offsetY*GAME_SCALE);
    this.view.position.x = this.positionX * this.view.width + this.offsetX*GAME_SCALE;
    this.view.position.y = this.positionY * this.view.height + this.offsetY*GAME_SCALE;
    //console.log (this.view.position.x, this.view.position.y);
};
