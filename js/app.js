/**
 * Created by alexa on 18.09.2016.
 */
//Game
var GAME = window.GAME || {};
//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics,
    Point = PIXI.Point,
    MovieClip = PIXI.extras.MovieClip,
    DisplayObject = PIXI.DisplayObject;

//Constants for level data, names in assets
const LEVEL_TILES = {
    "empty": ' ',
    "brick": '#',
    "block": '@',
    "ladder": 'H',
    "rope": '-',
    "trap": 'X',
    "hladder": 'S', //Ladder appears at end of level
    "gold": '$',
    "guard": '0',
    "runner": '&'
};

const MAP_KEYS = {
    EMPTY: "empty",
    BRICK: "brick",
    BLOCK: "block",
    LADDER: "ladder",
    ROPE: "rope",
    TRAP: "trap",
    HLADDER: "hladder",
    GOLD: "gold",
    GUARD: "guard",
    RUNNER: "runner"
};

const GAME_MODES = {
    PRELOADED: 1,
    GAME_MODE: 2,
    GAME_PAUSE: 3,
    GAME_OVER: 4

};

const GAME_SCALE = 0.75;
const ENTITY_WIDTH = 40;
const ENTITY_HEIGHT = 44;

const RUNNER_SPEED = 0.7;
const GUARD_SPEED =  0.35;
const FEEl_SPEED = 0.27;
const DIG_SPEED = 0.68;
var xMoveBase =  8;
var yMoveBase = 9;

const ACTIONS = {
    ACT_UNKNOWN : -1,
    ACT_STOP : 0,
    ACT_LEFT : 1,
    ACT_RIGHT : 2,
    ACT_UP : 3,
    ACT_DOWN : 4,
    ACT_FALL : 5,
    ACT_FALL_BAR : 6,
    ACT_DIG_LEFT : 7,
    ACT_DIG_RIGHT : 8,
    ACT_DIGGING  : 9,
    ACT_IN_HOLE  : 10,
    ACT_CLIMB_OUT : 11,
    ACT_REBORN : 12
};

const ENEMY_ACTIONS = {
    PATROLLING: 1,
    SCALING:2,
    DESCANDING:3
};
