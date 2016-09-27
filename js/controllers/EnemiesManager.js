/**
 * Created by alexa on 18.09.2016.
 */
GAME.EnemiesManager = function (engine)
{
    var STORAGE_NAME = 'enemies';
    Container.call( this );
    this.engine = engine;
    this.enemies = [];
    
    function getStorageName()
    {
        return STORAGE_NAME;
    }
    this.className = getStorageName();
};
GAME.EnemiesManager.prototype = Object.create(Container.prototype);
GAME.EnemiesManager.constructor = GAME.EnemiesManager;
GAME.EnemiesManager.prototype.initialize = function()
{
    var levelData = this.engine.gameLevelData;
    var keys = Object.getOwnPropertyNames(levelData);
    if (keys.indexOf("guard") == -1)
    {
        console.log("Error! No Enemies Data.WRONG LEVEL");
        return;
    }
    var cells = levelData["guard"];
    var len = cells.length,
        enemy,
        cell,
        i;
    for (i = len - 1; i >= 0; i--)
    {
        cell = cells[i];
        enemy = new Enemy(cell.x, cell.y);
        this.enemies.push(enemy);
        this.addChild(this.enemies[len - i - 1].view);
    }
};
GAME.EnemiesManager.prototype.updateTransform = function()
{
    Container.prototype.updateTransform.call(this);
};

GAME.EnemiesManager.prototype.toJson = function()
{
    var data = {},
        len = this.enemies.length,
        i, enemy;
    for (i = len - 1; i >= 0; i--)
    {
        enemy = this.enemies[i];
        data[i] = enemy.getJsonData();
    }
    return data;
};