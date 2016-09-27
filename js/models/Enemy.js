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
    this.nextTextures = [];
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
Enemy.prototype.getJsonData = function()
{
    var data = {},
        keys = Object.keys(this),
        self = this;

    keys.forEach(function (key, index, arr) {
        if (typeof(self[key]) != "object" && typeof(self[key]) != "function")
        {
            console.log(key);
            data[key] = self[key];
        }
    });

    return JSON.stringify(data);
};
