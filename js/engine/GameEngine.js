/**
 * Created by alexa on 18.09.2016.
 */
GAME.LodeRunner = function ()
{
    this.view = new GAME.GameView(this);
    this.playerManager = new GAME.PlayerManager(this);
    this.collisionManager = new GAME.CollisionManager(this);
    this.panelManager = new GAME.PanelManager(this);
    this.audioManager = new GAME.AudioManager(this);
    this.enemiesManager = new GAME.EnemiesManager(this);
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
    this.gamePause = false;
    this.gameLevelData = null;
};
GAME.LodeRunner.prototype = Object.create(null);
GAME.LodeRunner.constructor = GAME.LodeRunner;
GAME.LodeRunner.prototype.update = function()
{
};
GAME.LodeRunner.prototype.parseLevel = function(levelData)
{
    var _data = {},
        _x = 0,//cellX
        _y = 0,//cellY
        i = 0,
        _dataLen = _data.length,
        key;

    for (i = 0; i < _dataLen; i++)
    {
        key = Object.keys(LEVEL_TILES).filter(function(key) {return LEVEL_TILES[key] === levelData[i]})[0];

        if (key)
        {
            if (!_data.hasOwnProperty(key))
            {
                _data[key] = [];
            }
            _data[key].push(new Point(_x,_y));
            _x++;
            if (i > 0 && i % 28 === 0)
            {
                _y +=1;
                _x = 0;
            }
        }
        else
        {
            console.log("key not found "+ key);
        }
    }
    console.log(_data);
    this.gameLevelData = _data;
};
GAME.LodeRunner.prototype.initialize = function()
{
    this.parseLevel();
    this.enemiesManager.initialize();
    this.playerManager.initialize();
    this.view.initialize();
};
