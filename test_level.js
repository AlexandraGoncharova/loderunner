/**
 * Created by alexa on 13.09.2016.
 */
var levelData1 = [
    "                  S         " +
    "    $             S         " +
    "#######H#######   S         " +
    "       H----------S    $    " +
    "       H    ##H   #######H##" +
    "       H    ##H          H  " +
    "     0 H    ##H       $0 H  " +
    "##H#####    ########H#######" +
    "  H                 H       " +
    "  H           0     H       " +
    "#########H##########H       " +
    "         H          H       " +
    "       $ H----------H   $   " +
    "    H######         #######H" +
    "    H         &  $         H" +
    "############################"
    ];

//  Character | Type
//+-----------+-----------
//|  <space>  | Empty space
//|     #     | Normal Brick
//|     @     | Solid Brick
//|     H     | Ladder
//|     -     | Hand-to-hand bar (Line of rope)
//|     X     | False brick
//|     S     | Ladder appears at end of level
//|     $     | Gold chest
//|     0     | Guard
//|     &     | Player
var tileInfo = [
    [ "empty",    ' ' ], //(0), empty
    [ "brick",    '#' ], //(1)
    [ "block",    '@' ], //(2)
    [ "ladder",   'H' ], //(3)
    [ "rope",     '-' ], //(4)
    [ "trap",     'X' ], //(5)
    [ "hladder",  'S' ], //(6)
    [ "gold",     '$' ], //(7)
    [ "guard1",   '0' ], //(8)
    [ "runner1",  '&' ]  //(9)
];