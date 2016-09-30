/**
 * Created by alexa on 18.09.2016.
 */
var movePolicy = [ [0, 0, 0], //* move_map is used to find *//
    [0, 1, 1], //* wheather to move a enm   *//
    [1, 1, 1], //* by indexing into it with *//
    [1, 2, 1], //* enm_byte + num_enm +     *//
    [1, 2, 2], //* set_num to get a byte.   *//
    [2, 2, 2], //* then that byte is checked*//
    [2, 2, 3], //* for !=0 and then decrmnt *//
    [2, 3, 3], //* for next test until = 0  *//
    [3, 3, 3],
    [3, 3, 4],
    [3, 4, 4],
    [4, 4, 4]
];

GAME.EnemiesManager = function (engine)
{
    var STORAGE_NAME = "enemies";
    Container.call( this );
    this.engine = engine;
    this.enemies = [];
    this.map = engine.map;
    this.moveOffset = 0;
    this.currentId = 0;    //current guard id
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
   /* for (var i = 0; i < this.enemies.length; i++)
    {
        this.enemies[i].update();
    }*/
    this.move();
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
    return JSON.stringify(data);
};

GAME.EnemiesManager.prototype.restore = function(data)
{
    var _data = JSON.parse(data);
    var keys = Object.keys(_data),
        len = keys.length,
        key,
        enemy,
        obj,
        i;
    this.enemies = [];
    for (i = 0; i < len; i++ )
    {
        key = keys[i];
        obj = JSON.parse(_data[key]);
        console.log(obj);
        enemy = new Enemy(obj.positionX, obj.positionY);
        this.enemies.push(enemy);
        this.addChild(this.enemies[i].view);
    }
};
GAME.EnemiesManager.prototype.move = function()
{
    this.map = this.engine.map;

    var moves;
    var curGuard;
    var x, y, yOffset, guardCount = this.enemies.length;

    if(!guardCount) return; //no guard

    if( ++this.moveOffset >= 3 ) this.moveOffset = 0;
    moves = movePolicy[guardCount][this.moveOffset];

    while ( moves-- > 0) {
        if(++this.currentId >= guardCount) this.currentId = 0;
        curGuard = this.enemies[this.currentId];

        if(curGuard.action == ACTIONS.ACT_IN_HOLE || curGuard.action == ACTIONS.ACT_REBORN) {
            continue;
        }

        this.guardMoveStep(this.currentId, this.bestMove(this.currentId));
    }
};
GAME.EnemiesManager.prototype.guardMoveStep = function( id, action)
{
    var curGuard = this.enemies[id];
    var x = curGuard.positionX;
    var xOffset = curGuard.offsetX;
    var y = curGuard.positionY;
    var yOffset = curGuard.offsetY;

    var curToken, nextToken;
    var centerX, centerY;
    var curShape, newShape;
    var stayCurrPos;
    var tileW = ENTITY_WIDTH//*GAME_SCALE,
        tileH = ENTITY_HEIGHT//*GAME_SCALE;
    centerX = centerY = ACTIONS.ACT_STOP;

    if(curGuard.action == ACTIONS.ACT_CLIMB_OUT && action == ACTIONS.ACT_STOP)
        curGuard.action = ACTIONS.ACT_STOP;

    switch(action) {
        case ACTIONS.ACT_UP:
        case ACTIONS.ACT_DOWN:
        case ACTIONS.ACT_FALL:
            if ( action == ACTIONS.ACT_UP ) {
                nextToken = this.map.getTileAt(x, y - 1).active;
                stayCurrPos = ( y <= 0 ||
                nextToken == MAP_KEYS.BLOCK ||
                nextToken == MAP_KEYS.BRICK || nextToken == MAP_KEYS.TRAP ||
                nextToken == MAP_KEYS.GUARD);

                if( yOffset <= 0 && stayCurrPos)
                    action = ACTIONS.ACT_STOP;
            } else { //ACTIONS.ACT_DOWN || ACTIONS.ACT_FALL
                nextToken = this.map.getTileAt(x, y + 1).active;
                stayCurrPos = ( y >= 15 ||
                nextToken == MAP_KEYS.BLOCK ||
                nextToken == MAP_KEYS.BRICK || nextToken == MAP_KEYS.GUARD);
                curToken = this.map.getTileAt(x, y).active;
                if( action == ACTIONS.ACT_FALL && yOffset < 0 && curToken == MAP_KEYS.BLOCK) {
                    action = ACTIONS.ACT_IN_HOLE;
                    stayCurrPos = 1;
                } else {
                    if ( yOffset >= 0 && stayCurrPos)
                        action = ACTIONS.ACT_STOP;
                }
            }

            if ( action != ACTIONS.ACT_STOP ) {
                if ( xOffset > 0)
                    centerX = ACTIONS.ACT_LEFT;
                else if ( xOffset < 0)
                    centerX = ACTIONS.ACT_RIGHT;
            }
            break;
        case ACTIONS.ACT_LEFT:
        case ACTIONS.ACT_RIGHT:
            if ( action == ACTIONS.ACT_LEFT ) {

                if (x > 0)
                    nextToken = this.map.getTileAt(x - 1, y).active;
                else
                    nextToken = ACTIONS.ACT_UNKNOWN;
                stayCurrPos = ( x <= 0 ||
                nextToken == MAP_KEYS.BLOCK ||
                nextToken == MAP_KEYS.BRICK || nextToken == MAP_KEYS.GUARD ||
                nextToken == MAP_KEYS.TRAP);

                if (xOffset <= 0 && stayCurrPos)
                    action = ACTIONS.ACT_STOP;
            } else { //ACTIONS.ACT_RIGHT
                nextToken = this.map.getTileAt(x + 1, y).active;
                stayCurrPos = ( x >= 27 ||
                nextToken == MAP_KEYS.BLOCK ||
                nextToken == MAP_KEYS.BRICK || nextToken == MAP_KEYS.GUARD ||
                this.map.getTileAt(x + 1, y).base == MAP_KEYS.TRAP);

                if (xOffset >= 0 && stayCurrPos)
                    action = ACTIONS.ACT_STOP;
            }

            if ( action != ACTIONS.ACT_STOP ) {
                if ( yOffset > 0 )
                    centerY = ACTIONS.ACT_UP;
                else if ( yOffset < 0)
                    centerY = ACTIONS.ACT_DOWN;
            }
            break;
    }

    curToken = this.map.getTileAt(x,y).base;

    if ( action == ACTIONS.ACT_UP ) {
        yOffset -= yMoveBase;

        if(stayCurrPos && yOffset < 0) yOffset = 0; //stay on current position
        else if(yOffset < -tileH/2) { //move to y-1 position
            if ( curToken == MAP_KEYS.BLOCK || curToken.base == MAP_KEYS.HLADDER ) curToken = MAP_KEYS.EMPTY; //in hole or hide laddr
            this.engine.map.getTileAt(x,y).active = curToken; //runner move to [x][y-1], so set [x][y].act to previous state
            y--;
            yOffset = tileH + yOffset;
            //!!!!!!if(curToken.active == MAP_KEYS.RUNNER) setRunnerDead(); //collision

        }

        if( yOffset <= 0 && yOffset > -yMoveBase) {//todo move t collizion?????
            //!!!!!dropGold(id); //decrease count
        }
     }

    if ( centerY == ACTIONS.ACT_UP ) {
        yOffset -= yMoveBase;
        if( yOffset < 0) yOffset = 0; //move to center Y
    }

    if ( action == ACTIONS.ACT_DOWN || action == ACTIONS.ACT_FALL || action == ACTIONS.ACT_IN_HOLE) {
        var holdOnBar = 0;
        if(curToken == MAP_KEYS.ROPE) {
            if( yOffset < 0) holdOnBar = 1;
            else if(action == ACTIONS.ACT_DOWN && y < 15 && this.map.getTileAt(x,y+1).active != MAP_KEYS.LADDER) {
                action = ACTIONS.ACT_FALL;
            }
        }

        yOffset += yMoveBase;

        if(holdOnBar == 1 && yOffset >= 0) {
            yOffset = 0; //fall and hold on bar
            action = ACTIONS.ACT_FALL_BAR;
        }
        if(stayCurrPos && yOffset > 0 ) yOffset = 0; //stay on current position
        else if(yOffset > tileH/2) { //move to y+1 position
            if(curToken == MAP_KEYS.BLOCK || curToken == MAP_KEYS.HLADDER) curToken = MAP_KEYS.EMPTY; //in hole or hide laddr
            this.engine.map.getTileAt(x,y).active = curToken; //runner move to [x][y+1], so set [x][y].act to previous state
            y++;
            yOffset = yOffset - tileH;
            //!!!!!if(map[x][y].act == MAP_KEYS.RUNNER) setRunnerDead(); //collision
        }
        /*if(action == ACTIONS.ACT_DOWN && yOffset >= 0 && yOffset < yMoveBase) { //try drop gold
            dropGold(id); //decrease count
        }*///TODO To collizion????

        if(action == ACTIONS.ACT_IN_HOLE) { //check in hole or still falling
            if (yOffset < 0) action = ACTIONS.ACT_FALL; //still falling
            }


       /* if(action == ACTIONS.ACT_DOWN) {//todo change animation ?????
            newShape = "runUpDn";
        } else { //ACTIONS.ACT_FALL or ACTIONS.ACT_FALL_BAR
            if (action == ACTIONS.ACT_FALL_BAR) {
                if(curGuard.lastLeftRight == ACTIONS.ACT_LEFT) newShape = "barLeft";
                else newShape = "barRight";
            } else {
                if(action == ACTIONS.ACT_FALL && curShape != "fallLeft" && curShape != "fallRight") {
                    if (curGuard.lastLeftRight == ACTIONS.ACT_LEFT) newShape = "fallLeft";
                    else newShape = "fallRight";
                }
            }
        }*/
    }

    if ( centerY == ACTIONS.ACT_DOWN ) {
        yOffset += yMoveBase;
        if ( yOffset > 0 ) yOffset = 0; //move to center Y
    }

    if ( action == ACTIONS.ACT_LEFT) {
        xOffset -= xMoveBase;

        if(stayCurrPos && xOffset < 0) xOffset = 0; //stay on current position
        else if ( xOffset < -tileW / 2) { //move to x-1 position
            if(curToken == MAP_KEYS.BLOCK || curToken == MAP_KEYS.HLADDER) curToken = MAP_KEYS.EMPTY; //in hole or hide laddr
            this.engine.map.getTileAt(x,y).active = curToken;
            x--;
            xOffset = tileW + xOffset;
            //if(map[x][y].act == MAP_KEYS.RUNNER) setRunnerDead(); //collision todo ???

        }
          }

    if ( centerX == ACTIONS.ACT_LEFT ) {
        xOffset -= xMoveBase;
        if ( xOffset < 0) xOffset = 0; //move to center X
    }

    if ( action == ACTIONS.ACT_RIGHT ) {
        xOffset += xMoveBase;

        if(stayCurrPos && xOffset > 0) xOffset = 0; //stay on current position
        else if ( xOffset > tileW/2) { //move to x+1 position
            if(curToken == MAP_KEYS.BLOCK || curToken == MAP_KEYS.HLADDER) curToken = MAP_KEYS.EMPTY;
            this.engine.map.getTileAt(x,y).active = curToken;
            x++;
            xOffset = xOffset - tileW;

        }
       /* if( xOffset >= 0 && xOffset < xMoveBase) { //todo ??????
            dropGold(id);
        }
        if(curToken == MAP_KEYS.BAR) newShape = "barRight";
        else newShape = "runRight";*/
    }

    if ( centerX == ACTIONS.ACT_RIGHT ) {
        xOffset += xMoveBase;
        if ( xOffset > 0) xOffset = 0; //move to center X
    }

    this.engine.map.getTileAt(x,y).active = MAP_KEYS.GUARD;

   // console.log("id = " + id);
    this.enemies[id].updatePosition(x,y,xOffset, yOffset, action);
 };
GAME.EnemiesManager.prototype.bestMove = function (id)
{
    var guarder = this.enemies[id];
    var x = guarder.positionX;
    var xOffset = guarder.offsetX;
    var y = guarder.positionY;
    var yOffset = guarder.offsetY;

    var curToken, nextBelow, nextMove;
    var checkSameLevelOnly = 0;

    curToken = this.map.getTileAt(x,y).base;
    if( !checkSameLevelOnly) {
        if ( curToken == MAP_KEYS.LADDER || (curToken == MAP_KEYS.ROPE && yOffset === 0) ) { //ladder & bar
            /* no guard fall */
        } else if ( yOffset < 0)
            return (ACTIONS.ACT_FALL);
        else if ( y < 15 )
        {
            nextBelow = this.map.getTileAt(x,y+1).active;

            if ( (nextBelow == MAP_KEYS.EMPTY || nextBelow == MAP_KEYS.RUNNER )) {
                return (ACTIONS.ACT_FALL);
            } else if ( nextBelow != MAP_KEYS.BLOCK && nextBelow != MAP_KEYS.BRICK &&
                nextBelow != MAP_KEYS.GUARD && nextBelow != MAP_KEYS.LADDER ) {
                return ( ACTIONS.ACT_FALL );
            }
        }
    }
    var runner = this.engine.playerManager.player;
    var runnerX = runner.positionX;
    var runnerY = runner.positionY;

    if ( y == runnerY && runner.action != ACTIONS.ACT_FALL) { //case : guard on laddr and falling => don't catch it 
        while ( x != runnerX ) {
            if ( y < 15 )
                nextBelow = this.map.getTileAt(x,y+1).base;
            else nextBelow = MAP_KEYS.BLOCK;

            curToken = this.map.getTileAt(x,y).base;

            if ( curToken == MAP_KEYS.LADDER || curToken == MAP_KEYS.ROPE ||  // go through
                nextBelow == MAP_KEYS.BLOCK || nextBelow == MAP_KEYS.LADDER ||
                nextBelow == MAP_KEYS.BLOCK )
            {
                if ( x < runnerX)  // guard left to runner
                    ++x;
                else if ( x > runnerX )
                    --x;      // guard right to runner
            } else break;     // exit loop with closest x if no path to runner
        }

        if ( x == runnerX )  // scan for a path ignoring walls is a success
        {
            if (guarder.positionX < runnerX ) {  //if left of man go right else left
                nextMove = ACTIONS.ACT_RIGHT;
            } else if ( guarder.positionX > runnerX ) {
                nextMove = ACTIONS.ACT_LEFT;
            } else { // guard X = runner X
                if ( guarder.offsetX < runner.offsetX )
                    nextMove = ACTIONS.ACT_RIGHT;
                else
                    nextMove = ACTIONS.ACT_LEFT;
            }
            return (nextMove);
        }
    }
    return this.scanFloor(id);
};

var bestPath, bestRating, curRating;
var leftEnd, rightEnd;
var startX, startY;

GAME.EnemiesManager.prototype.scanFloor = function(id)
{
    var x, y;
    var curToken, nextBelow;
    var curPath;
    var enemy = this.enemies[id];
    x = startX = enemy.positionX;
    y = startY = enemy.positionY;

    bestRating = 255;   // start with worst rating
    curRating = 255;
    bestPath = ACTIONS.ACT_STOP;

    while ( x > 0 ) {                                    //get left end first
        curToken = this.map.getTileAt(x-1,y).active;
        if ( curToken == MAP_KEYS.BLOCK || curToken == MAP_KEYS.BRICK )
            break;
        if ( curToken == MAP_KEYS.LADDER || curToken == MAP_KEYS.ROPE || y >= 15 ||
            y < 15 && ( ( nextBelow = this.map.getTileAt(x-1,y + 1).base) == MAP_KEYS.BLOCK ||
            nextBelow == MAP_KEYS.BRICK || nextBelow == MAP_KEYS.LADDER ) )
            --x;
        else {
            --x;                                        // go on left anyway 
            break;
        }
    }

    leftEnd = x;
    x = startX;
    while ( x < 27 ) {                           // get right end next
        curToken = this.map.getTileAt(x+1,y).active;
        if ( curToken  == MAP_KEYS.BLOCK || curToken == MAP_KEYS.BRICK )
            break;

        if ( curToken == MAP_KEYS.LADDER || curToken == MAP_KEYS.ROPE || y >= 15 ||
            y < 15 && ( ( nextBelow = this.map.getTileAt(x+1,y+1).base) == MAP_KEYS.BLOCK ||
            nextBelow == MAP_KEYS.BRICK || nextBelow == MAP_KEYS.LADDER ) )
            ++x;
        else {                                         // go on right anyway
            ++x;
            break;
        }
    }

    rightEnd = x;

    // Do middle scan first for best rating and direction

    x = startX;
    if ( y < 15 &&
        (nextBelow = this.map.getTileAt(x,y + 1).base) != MAP_KEYS.BLOCK && nextBelow != MAP_KEYS.BRICK )
        this.scanDown( x, ACTIONS.ACT_DOWN );

    if( this.map.getTileAt(x,y + 1).base == MAP_KEYS.LADDER )
        this.scanUp( x, ACTIONS.ACT_UP );

    // next scan both sides of floor for best rating
    curPath = ACTIONS.ACT_LEFT;
    x = leftEnd;

    while ( true ) {
        if ( x == startX ) {
            if ( curPath == ACTIONS.ACT_LEFT && rightEnd != startX ) {
                curPath = ACTIONS.ACT_RIGHT;
                x = rightEnd;
            }
            else break;
        }

        if( y < 15 &&
            (nextBelow = this.map.getTileAt(x,y + 1).base) != MAP_KEYS.BLOCK && nextBelow != MAP_KEYS.BRICK )
            this.scanDown (x, curPath );

        if( this.map.getTileAt(x,y).base == MAP_KEYS.LADDER )
            this.scanUp( x, curPath );

        if ( curPath == ACTIONS.ACT_LEFT )
            x++;
        else x--;
    }


    return ( bestPath );
} ;                          // end scan floor for best direction to go

GAME.EnemiesManager.prototype.scanDown = function(x, curPath )
{
    var y;
    var nextBelow; //curRating;
    var runner = this.engine.playerManager.player;
    var runnerX = runner.positionX;
    var runnerY = runner.positionY;

    y = startY;
    var currentTile = this.map.getTileAt(x,y);
    while( y < 15 && ( nextBelow = this.map.getTileAt(x,y+1).base) != MAP_KEYS.BLOCK &&
    nextBelow != MAP_KEYS.BRICK )
    {
        if ( currentTile.base != MAP_KEYS.EMPTY && currentTile.base != MAP_KEYS.HLADDER) {
            if ( x > 0 ) {                          // if not at left edge check left side
                if ( (nextBelow = this.map.getTileAt(x-1, y+1).base) == MAP_KEYS.BLOCK ||
                    nextBelow == MAP_KEYS.LADDER || nextBelow == MAP_KEYS.BRICK ||
                    this.map.getTileAt(x-1,y).base == MAP_KEYS.ROPE )     // can move left
                {
                    if ( y >= runnerY )             // no need to go on
                        break;                      // already below runner
                }
            }

            if ( x < 27 )                     // if not at right edge check right side
            {
                if ( (nextBelow = this.map.getTileAt(x+1,y+1).base) == MAP_KEYS.BLOCK ||
                    nextBelow == MAP_KEYS.LADDER || nextBelow == MAP_KEYS.BRICK ||
                    this.map.getTileAt(x+1,y).base == MAP_KEYS.ROPE )     // can move right
                {
                    if ( y >= runnerY )
                        break;
                }
            }
        }
        ++y;
    }

    if( y == runnerY ) {
        curRating = Math.abs(startX - x);
    } else if ( y > runnerY )
        curRating = y - runnerY + 200;
    else curRating = runnerY - y + 100;

    if( curRating < bestRating )
    {
        bestRating = curRating;
        bestPath = curPath;
    }

};

GAME.EnemiesManager.prototype.scanUp = function( x, curPath )
{
    var y;
    var nextBelow;
    var runner = this.engine.playerManager.player;
    var runnerX = runner.positionX;
    var runnerY = runner.positionY;


    y = startY;
    var currentTile = this.map.getTileAt(x,y);
    while ( y > 0 && currentTile.base == MAP_KEYS.LADDER ) {
        --y;
        if ( x > 0 ) {
            if ( (nextBelow = this.map.getTileAt(x-1,y+1).base) == MAP_KEYS.BLOCK ||
                nextBelow == MAP_KEYS.BRICK || nextBelow == MAP_KEYS.LADDER ||
                this.map.getTileAt(x-1,y).base == MAP_KEYS.ROPE )
            {
                if ( y <= runnerY )
                    break;
            }
        }

        if ( x < 27 ) {
            if ( (nextBelow = this.map.getTileAt(x+1,y+1).base) == MAP_KEYS.BLOCK ||
                nextBelow == MAP_KEYS.BRICK || nextBelow == MAP_KEYS.LADDER ||
                this.map.getTileAt(x+1,y).base == MAP_KEYS.ROPE )
            {
                if ( y <= runnerY )
                    break;
            }
        }

    }

    if ( y == runnerY ) {
        curRating = Math.abs(startX - x);

    } else if ( y > runnerY )
        curRating = y - runnerY + 200;
    else curRating = runnerY - y + 100;

    if ( curRating < bestRating )
    {
        bestRating = curRating;
        bestPath = curPath;
    }

};
