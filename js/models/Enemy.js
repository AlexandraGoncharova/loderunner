/**
 * Created by alexa on 18.09.2016.
 */
function Enemy(x,y)
{
    var textures = PIXI.loader.resources["assets/enemy.json"].textures;
    this.runLeft = [
        textures["1.png"],
        textures["2.png"],
        textures["3.png"],
        textures["4.png"]
    ];

    this.runRight = [
        textures["5.png"],
        textures["6.png"],
        textures["7.png"],
        textures["8.png"]
    ];
    this.ladding = [
        textures["9.png"],
        textures["10.png"],
        textures["11.png"],
        textures["12.png"]
    ];

    this.ropeLeft = [
        textures["13.png"],
        textures["14.png"],
        textures["15.png"],
        textures["16.png"]
    ];

    this.ropeRight = [
        textures["17.png"],
        textures["18.png"],
        textures["19.png"],
        textures["20.png"]
    ];
    this.positionX = x;
    this.positionY = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.action = ACTIONS.ACT_STOP;
    this.currentAction = ENEMY_ACTIONS.PATROLLING;
    this.direction = ACTIONS.ACT_LEFT;
    this.hasGold = 0;
    this.inHole = false;
    this.isChanged = true;
    this.view = new MovieClip(this.runLeft);
    this.view.scale.set(GAME_SCALE);
    this.view.position.x = this.positionX * this.view.width;
    this.view.position.y = this.positionY * this.view.height;
    this.view.anchor.set(0);
    this.view.animationSpeed = 0.1;
    this.view.play();
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.constructor = Enemy;
Enemy.prototype.updatePosition = function(x, y, offX, offY, action)
{
    //if (x != this.positionX || y!= this.positionY || offX != this.offsetX || offY != this.offsetY || this.currentAction != action)
    //{
        this.isChanged = true;
        this.positionX = x;
        this.positionY = y;
        this.offsetX = offX;
        this.offsetY = offY;
        this.action = action;
        this.update();
   // }
};
Enemy.prototype.update = function()
{
   // if (this.isChanged)
   // {
        this.view.position.x = this.positionX * this.view.width + this.offsetX*GAME_SCALE;
        this.view.position.y = this.positionY * this.view.height + this.offsetY*GAME_SCALE;
  //  }
    //todo change animation and view position if changed
};
Enemy.prototype.move = function () {
    
};
