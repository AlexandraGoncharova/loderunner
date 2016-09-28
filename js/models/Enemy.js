/**
 * Created by alexa on 18.09.2016.
 */
function Enemy(x,y)
{
    var textures = resources["assets/guard1.png"].texture;
    console.log(textures);
    this.positionX = x;
    this.positionY = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentAction = ACTIONS.ACT_LEFT;
    this.hasGold = 0;
    this.inHole = false;
    this.isChanged = true;
    this.view = new Sprite(textures);//new MovieClip(textures);
    this.view.scale.set(GAME_SCALE);
    this.view.position.x = this.positionX * ENTITY_WIDTH * GAME_SCALE;//this.view.width;
    this.view.position.y = this.positionY * ENTITY_HEIGHT * GAME_SCALE;//this.view.height;
    this.view.anchor.set(0);
   // this.view.animationSpeed = 0.1;
  //  this.view.play();
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.constructor = Enemy;
Enemy.prototype.updatePosition = function(x, y, offX, offY, action)
{
    if (x != this.positionX || y!= this.positionY || offX != this.offsetX || offY != this.offsetY || this.currentAction != action)
    {
        this.isChanged = true;
        this.positionX = x;
        this.positionY = y;
        this.offsetX = offX;
        this.offsetY = offY;
        this.currentAction = action;
        
    }
};
Enemy.prototype.update = function()
{
    this.move();
    //todo change animation and view position if changed
};
Enemy.prototype.move = function () {
    
};
