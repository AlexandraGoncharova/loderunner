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

const GAME_MODES = Object.freeze({
    PRELOADED: 1,
    GAME_MODE: 2,
    GAME_PAUSE: 3,
    GAME_OVER: 4

});

const GAME_SCALE = 0.75;
const ENTITY_WIDTH = 40;
const ENTITY_HEIGHT = 42;
