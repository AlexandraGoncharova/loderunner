/**
 * Created by alexa on 18.09.2016.
 */
GAME.PlayerManager = function(engine)
{
    var STORAGE_NAME = 'player';
    Container.call( this );
    this.engine = engine;
    this.player = null;
    function getStorageName()
    {
        return STORAGE_NAME;
    }
    this.className = getStorageName();
};
GAME.PlayerManager.prototype = Object.create(Container.prototype);
GAME.PlayerManager.constructor = GAME.PlayerManager;
GAME.PlayerManager.prototype.initialize = function()
{
    var levelData = this.engine.gameLevelData;
    if (!levelData.hasOwnProperty("runner"))
    {
        console.log("Error! No Player Data.WRONG LEVEL");
        return;
    }
    var cell = levelData["runner"][0];
    this.player = new Player(cell.x, cell.y);
    this.addChild(this.player.view);
};
GAME.PlayerManager.prototype.toJson = function () {
    return this.player.getJsonData();
};
GAME.PlayerManager.prototype.restore = function(data)
{
    var _data = JSON.parse(data);
    this.player = new Player(_data.positionX, _data.positionY);
    this.player.offsetX = _data.offsetX;
    this.player.offsetY = _data.offsetY;
    this.player.isDead = _data.isDead;
    this.addChild(this.player.view);
};
GAME.PlayerManager.prototype.updateTransform = function()
{
    //todo
    this.movePlayer();
    Container.prototype.updateTransform.call(this);
};
GAME.PlayerManager.prototype.movePlayer = function()
{
    var x = this.player.positionX;
    var y = this.player.positionY;
    var xOffset = this.player.offsetX;
    var yOffset = this.player.offsetY;
    var map = this.engine.map;
    var tile = map.getTileAt(x,y);
    var moveStep = ACTIONS.ACT_STOP;
    var stayCurrPos = 1,
        nextTile,
        isFalling;
    nextTile = map.getTileAt(x,y+1);
    if ( tile.base == MAP_KEYS.LADDER || (tile.base == MAP_KEYS.ROPE && yOffset == 0) ) { //ladder & bar
        isFalling = false; //ok to move (on ladder or bar)
    } else if (yOffset < 0) {  //no ladder && yOffset < 0 ==> falling
        isFalling = true;
    } else if (y < 15) { //no laddr && y < maxTileY && yOffset >= 0
        switch (true) {
            case (nextTile.active == MAP_KEYS.EMPTY):
                isFalling = true;
                break;
            case ( nextTile.active == MAP_KEYS.BRICK || nextTile.active == MAP_KEYS.LADDER || nextTile.active == MAP_KEYS.BLOCK):
                isFalling = false;
                break;
            case ( nextTile.active == MAP_KEYS.GUARD):
                isFalling = false;
                break;
            default:
                isFalling = true;
                break;
        }
    } else { // no laddr && y == maxTileY
        isFalling = false;
    }

    if ( isFalling ) {
        stayCurrPos = ( y >= 15 || nextTile.active == MAP_KEYS.BRICK || nextTile.active == MAP_KEYS.BLOCK || nextTile.active == MAP_KEYS.GUARD);

        this.moveStep(ACTIONS.ACT_FALL, stayCurrPos);
        return;
    }

    switch(true) {
        case GAME.Controls.pressed(GAME.Controls.UP):
            nextTile = map.getTileAt(x,y - 1).active;
            stayCurrPos = ( y <= 0 || nextTile == MAP_KEYS.BRICK || nextTile == MAP_KEYS.BLOCK || nextTile == MAP_KEYS.TRAP );
            nextTile = map.getTileAt(x, y + 1).base;
            if (y > 0 && tile.base != MAP_KEYS.LADDER && yOffset < ENTITY_HEIGHT / 4 && yOffset > 0 && nextTile.base == MAP_KEYS.LADDER)
            {
                stayCurrPos = 1;
                moveStep = ACTIONS.ACT_UP;
            } else
            if (!( tile.base != MAP_KEYS.LADDER &&
                (yOffset <= 0 || nextTile.base != MAP_KEYS.LADDER) ||
                (yOffset <= 0 &&  stayCurrPos ) )
            ) {
                moveStep = ACTIONS.ACT_UP;
            }

            break;
        case GAME.Controls.pressed(GAME.Controls.DOWN):
            nextTile = map.getTileAt(x, y + 1).active;
            stayCurrPos = ( y >= 15 || nextTile == MAP_KEYS.BRICK || nextTile == MAP_KEYS.BLOCK);

            if (!(yOffset >= 0 && stayCurrPos))
                moveStep = ACTIONS.ACT_DOWN;
            break;
        case GAME.Controls.pressed(GAME.Controls.LEFT):
            nextTile = map.getTileAt(x - 1, y).active;
            stayCurrPos = ( x <= 0 || nextTile == MAP_KEYS.BRICK || nextTile == MAP_KEYS.BLOCK || nextTile == MAP_KEYS.TRAP);

            if (!(xOffset <= 0 && stayCurrPos))
                moveStep = ACTIONS.ACT_LEFT;
            break;
        case GAME.Controls.pressed(GAME.Controls.RIGHT):
            nextTile = map.getTileAt(x + 1, y).active;
            stayCurrPos = ( x >= 27	|| nextTile == MAP_KEYS.BRICK || nextTile == MAP_KEYS.BLOCK || nextTile == MAP_KEYS.TRAP);

            if (!(xOffset >= 0 && stayCurrPos))
                moveStep = ACTIONS.ACT_RIGHT;
            break;
        /*case ACT_DIG_LEFT:
        case ACT_DIG_RIGHT:
            if(ok2Dig(keyAction)) {
                runnerMoveStep(keyAction, stayCurrPos);
                digHole(keyAction);
            } else {
                runnerMoveStep(ACT_STOP, stayCurrPos);
            }
            keyAction = ACT_STOP;
            return;*/
    }
    this.moveStep(moveStep, stayCurrPos);

};
GAME.PlayerManager.prototype.moveStep = function(action, stayCurrPos)
{
    var x = this.player.positionX;
    var y = this.player.positionY;
    var xOffset = this.player.offsetX;
    var yOffset = this.player.offsetY;
    var map = this.engine.map;
    var tile = map.getTileAt(x,y);
    var tileIndex = map.tiles.indexOf(tile);
    var tileW = ENTITY_WIDTH,//*GAME_SCALE,
        tileH = ENTITY_HEIGHT;//*GAME_SCALE;

    var centerX, centerY, currentTileType;

    centerX = centerY = ACTIONS.ACT_STOP;
    currentTileType = tile.base;
    switch(action)	{
        case ACTIONS.ACT_DIG_LEFT:
        case ACTIONS.ACT_DIG_RIGHT:
            xOffset = 0;
            yOffset = 0;
            break;
        case ACTIONS.ACT_UP:
        case ACTIONS.ACT_DOWN:
        case ACTIONS.ACT_FALL:
            if ( xOffset > 0 ) centerX = ACTIONS.ACT_LEFT;
            else if (xOffset < 0) centerX = ACTIONS.ACT_RIGHT;
            break;
        case ACTIONS.ACT_LEFT:
        case ACTIONS.ACT_RIGHT:
            if( yOffset > 0 ) centerY = ACTIONS.ACT_UP;
            else if (yOffset < 0) centerY = ACTIONS.ACT_DOWN;
            break;
    }


    if ( action == ACTIONS.ACT_UP ) {
        yOffset -= xMoveBase;
        if(stayCurrPos && yOffset < 0) yOffset = 0; //stay on current position
        else if(yOffset < -tileH / 2) { //move to y-1 position
            if ( currentTileType == MAP_KEYS.BRICK || currentTileType == MAP_KEYS.HLADDER ) currentTileType = MAP_KEYS.EMPTY; //in hole or hide laddr
            this.engine.map.getTileAt(x,y).active = currentTileType; //runner move to [x][y-1], so set [x][y].act to previous state*/
            y--;
            yOffset = tileH + yOffset;
          }
        this.player.nextTextures = this.player.laddingFrames;
    }

    if ( centerY == ACTIONS.ACT_UP ) {
        yOffset -= yMoveBase;
        if( yOffset < 0) yOffset = 0;
    }

    if ( action == ACTIONS.ACT_DOWN || action == ACTIONS.ACT_FALL) {
        var holdOnBar = 0;
        if(tile.base == MAP_KEYS.ROPE) {
            if( yOffset < 0) holdOnBar = 1;
            else if(action == ACTIONS.ACT_DOWN && y < 15 && map.getTileAt(x,y+1).active != MAP_KEYS.LADDER) {
                action = ACTIONS.ACT_FALL;
            }
        }

        yOffset += yMoveBase;

        if(holdOnBar == 1 && yOffset >= 0) {
            yOffset = 0; //fall and hold on bar
            action = ACTIONS.ACT_FALL_BAR;
        }
        if(stayCurrPos && yOffset > 0) yOffset = 0; //stay on current position
        else if(yOffset > tileH / 2) { //move to y+1 position
            if ( currentTileType == MAP_KEYS.BRICK || currentTileType == MAP_KEYS.HLADDER ) currentTileType = MAP_KEYS.EMPTY;
            this.engine.map.getTileAt(x,y).active = currentTileType;
            y++;
            yOffset = yOffset - tileH;
        }
    }

    if ( centerY == ACTIONS.ACT_DOWN ) {
        yOffset += yMoveBase;
        if ( yOffset > 0 ) yOffset = 0; //move to center Y
    }

    if ( action == ACTIONS.ACT_LEFT) {
        xOffset -= xMoveBase;

        if(stayCurrPos && xOffset < 0) xOffset = 0;
        else if ( xOffset < -ENTITY_WIDTH / 2) {
            if ( currentTileType == MAP_KEYS.BRICK || currentTileType == MAP_KEYS.HLADDER ) currentTileType = MAP_KEYS.EMPTY;
            this.engine.map.getTileAt(x,y).active = currentTileType;
            x--;
            xOffset = tileW + xOffset;
        }
        if(currentTileType == MAP_KEYS.ROPE) this.player.nextTextures = this.player.ropeFrames;
        else this.player.nextTextures = this.player.runningFrames;
    }

    if ( centerX == ACTIONS.ACT_LEFT ) {
        xOffset -= xMoveBase;
        if ( xOffset < 0) xOffset = 0; //move to center X
    }

    if ( action == ACTIONS.ACT_RIGHT ) {
        xOffset += xMoveBase;

        if(stayCurrPos && xOffset > 0) xOffset = 0;
        else if ( xOffset > ENTITY_WIDTH / 2) {
            if ( currentTileType == MAP_KEYS.BRICK || currentTileType == MAP_KEYS.HLADDER ) currentTileType = MAP_KEYS.EMPTY;
            this.engine.map.getTileAt(x,y).active = currentTileType;
            x++;
            xOffset = xOffset - tileW;
          }
        if(currentTileType == MAP_KEYS.ROPE) this.player.nextTextures = this.player.ropeFrames;
        else this.player.nextTextures = this.player.runningFrames;
    }

    if ( centerX == ACTIONS.ACT_RIGHT ) {
        xOffset += xMoveBase;
        if ( xOffset > 0) xOffset = 0; //move to center X
    }


    this.player.positionY = y;
    this.player.positionX = x;
    this.player.offsetX = xOffset;
    this.player.offsetY = yOffset;
    this.engine.map.getTileAt(x,y).active = MAP_KEYS.RUNNER;
    this.player.update();

};