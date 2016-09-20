/**
 * Created by alexa on 20.09.2016.
 */
GAME.LevelBackground = function(engine)
{
   Container.call(this);
   this.engine = engine;
};

GAME.LevelBackground.prototype = Object.create(Container.prototype);
GAME.LevelBackground.constructor = GAME.LevelBackground;
GAME.LevelBackground.prototype.createLevel = function()
{
    var levelData = this.engine.gameLevelData,
        dataLen = 0,
        data = [],
        sprite,
        point;
    for(var key in levelData) {
        if (levelData.hasOwnProperty(key) && key != "guard" && key != "runner") {
            data = levelData[key];
            dataLen = data.length;
            for (var i = 0; i < dataLen; i++)
            {
                point = data[i];
                console.log(key);
                sprite = new Sprite(resources["assets/"+key+".png"].texture);
                sprite.scale.set(GAME_SCALE);
                sprite.position.set(point.x * sprite.width, point.y * sprite.height);
                if (key == "hladder")
                    sprite.alpha = 0;
                this.addChild(sprite);
            }
        }
    }

};