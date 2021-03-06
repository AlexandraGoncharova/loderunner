/**
 * Created by alexa on 20.09.2016.
 */
GAME.LevelMap = function(engine)
{
   var STORAGE_NAME = 'map';
   Container.call(this);
   this.engine = engine;
   this.tiles = [];

    function getStorageName()
    {
        return STORAGE_NAME;
    }
    this.className = getStorageName();
};

GAME.LevelMap.prototype = Object.create(Container.prototype);
GAME.LevelMap.constructor = GAME.LevelMap;
GAME.LevelMap.prototype.createLevel = function()
{
    var levelData = this.engine.gameLevelData,
        dataLen = 0,
        data = [],
        sprite,
        point,
        tile;
    this.tiles = [];
    for(var key in levelData) {
        if (levelData.hasOwnProperty(key)) {
            data = levelData[key];
            dataLen = data.length;
            for (var i = 0; i < dataLen; i++)
            {
                point = data[i];
                if (key == MAP_KEYS.GUARD || key == MAP_KEYS.RUNNER)
                    sprite = new Sprite(resources["assets/"+MAP_KEYS.EMPTY+".png"].texture);
                else
                    sprite = new Sprite(resources["assets/"+key+".png"].texture);
                tile = new TileMap(point, key, key, sprite, true );
                this.tiles.push(tile);

            }
        }
    }
 };
GAME.LevelMap.prototype.updateTransform = function()
{
    var self = this;
    var isChanged = this.tiles.some(function(el, index, arr){
        return el.isChanged;
    });

    if(isChanged)
    {
        var sprite;
        this.tiles.forEach(function(el, index, arr){
            if (el.isChanged)
            {
                if(self.children.length > 0)
                    self.removeChild(el.sprite);
                sprite = el.sprite;//new Sprite(resources["assets/"+el.active+".png"].texture);???
                sprite.scale.set(GAME_SCALE);
                sprite.position.set(el.cellX * sprite.width, el.cellY * sprite.height);
                if (el.active == MAP_KEYS.HLADDER)
                    sprite.alpha = 0;
                el.isChanged = false;
                el.sprite = sprite;
                self.addChild(sprite);
            }

        });

    }
    Container.prototype.updateTransform.call(this);
};

GAME.LevelMap.prototype.getTileAt = function(x,y)
{
    var tile = this.tiles.filter(function(el, index, arr){
        return (el.cellX === x && el.cellY === y)
            });
    return tile.length>0?tile[0]:null;
};
GAME.LevelMap.prototype.toJson = function()
{
    var data = {},
        len = this.tiles.length,
        i, tile;
    for (i = len - 1; i >= 0; i--)
    {
        tile = this.tiles[i];
        data[i] = tile.getJsonData();
    }
    return JSON.stringify(data);
};
GAME.LevelMap.prototype.restore = function (data)
{
    var _data = JSON.parse(data);
    var keys = Object.keys(_data),
        len = keys.length,
        key,
        tile,
        obj,
        i,
        sprite;
    this.tiles = [];
    for (i = 0; i < len; i++ )
    {
        key = keys[i];
        obj = JSON.parse(_data[key]);

        if (obj.base == MAP_KEYS.GUARD || obj.base == MAP_KEYS.RUNNER)
            sprite = new Sprite(resources["assets/"+MAP_KEYS.EMPTY+".png"].texture);
        else
            sprite = new Sprite(resources["assets/"+obj.base+".png"].texture);
        tile = new TileMap(new Point(obj.cellX, obj.cellY), obj.base, obj.active, sprite, true );
        this.tiles.push(tile);
    }
};