/**
 * Created by a.goncharova on 28.09.2016.
 */
GAME.AIManager = function ()
{

};
GAME.AIManager.prototype = Object.create(null);
GAME.AIManager.constructor = GAME.AIManager;
GAME.AIManager.prototype.ai = function(enemy, player, map)
{
   var _enemy = enemy, _player = player, _map = map;

    if (_enemy.positionY == _player.positionY)
    {
        if (this.canPath(_enemy, _player, _map))
        {
            this.pursue(_enemy);
            return;
        }
    }
    if ((_enemy.currentAction == ENEMY_ACTIONS.PATROLLING && !_enemy.interaction == ACTIONS.ACT_UP) ||
        (_enemy.currentAction == ENEMY_ACTIONS.DESCANDING && !_enemy.interaction == ACTIONS.ACT_DOWN))
    {
        _enemy.currentAction = ENEMY_ACTIONS.PATROLLING;
    }

    if(_player.positionY < _enemy.positionY) {
        //if () beginScale(p);
        //else if (p.scaling && !p.patrolling) scale(p);
    }
    /*else if (player.ypos > p.ypos) {
        if (p.interact[8] && !p.descending) beginDescend(p);
        else if (p.descending && !p.patrolling) descend(p);
    }*/
    if (_enemy.currentAction == ENEMY_ACTIONS.PATROLLING) this.patrol(_enemy, _map);
        
};
GAME.AIManager.prototype.canPath = function (enemy, player, map) {
    var x = enemy.positionX,
        y = enemy.positionY,
        nextTile;
    if (player.positionX > x) {
        nextTile = map.getTileAt(x + 1, y);
        return !(nextTile.active == MAP_KEYS.BLOCK || nextTile.active == MAP_KEYS.BRICK);
    }
    else if (player.positionX < x) {
        nextTile = map.getTileAt(x - 1, y);
        return !(nextTile.active == MAP_KEYS.BLOCK || nextTile.active == MAP_KEYS.BRICK);
    }
    return true;
};
/*

beginScale = function(p) {
    directUp(p);
    p.scaling = true;
    p.descending = false;
    p.patrolling = false;
};

scale = function(p) {
    directUp(p);
    if (p.interact[8]) {
        p.scaling = false;
        p.patrolling = true;
    }
};

beginDescend = function(p) {
    directDown(p);
    p.scaling = false;
    p.descending = true;
    p.patrolling = false;
};

descend = function(p) {
    directDown(p);
    if (!p.moving[3]) {
        p.descending = false;
        p.patrolling = true;
    }
};
*/
//http://lfdl.lucky-labs.com/get/ivjggm7fOkx0Zcpkl2Vt
GAME.AIManager.prototype.patrol = function(enemy, map) {
    var r = Math.random(),
        nextTile;
    nextTile = map.getTileAt(x+1,y);
    if (enemy.interaction == ACTIONS.ACT_RIGHT || x>=27 || !nextTile || nextTile.active == MAP_KEYS.EMPTY) this.directLeft(enemy, map); // RIGHT SIDE BOUNDARY
    if (p.interact[6] || tileArray[parseInt(p.ypos/tileSize)+1][parseInt(p.xpos/tileSize)].type == 0) directRight(p); // LEFT SIDE BOUNDARY
    if (r > 0.99) { // RANDOM ALTERATIONS
        if (p.lastDirection==1) directRight(p);
        else if (p.lastDirection==0) directLeft(p);
    }
    if (p.lastDirection!=0 && p.lastDirection!=1) {
        if (r>0.5) directRight(p);
        else directLeft(p);
    }
};

GAME.AIManager.prototype.pursue = function(p) {
    if (p.xpos > player.xpos) directLeft(p);
    else directRight(p);
};
/*
deflt = function(p) {
    directRight(p);
};*/
