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
var tileInfo = {
        "empty": ' ',
        "brick": '#',
        "block": '@',
        "ladder": 'H',
        "rope": '-',
        "trap": 'X',
        "hladder": 'S',
        "gold": '$',
        "guard1": '0',
        "runner1": '&'
};
