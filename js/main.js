/**
 * Created by alexa on 13.09.2016.
 */
document.addEventListener("DOMContentLoaded", function(event) {
    onReady();
});

function onReady() {
    /*


     var stage = new Container(),
     renderer = autoDetectRenderer(960, 800);
     document.body.appendChild(renderer.view);

     */

    loader
        .add([
            "assets/block.png",
            "assets/brick.png",
            "assets/empty.png",
            "assets/ladder.png",
            "assets/rope.png",
            "assets/trap.png",
            "assets/hladder.png",
            "assets/gold.png",
            "assets/guard1.png",
            "assets/runner1.png",
            "assets/characters.json"
        ])
        .on("progress", loadProgressHandler)
        .load(init);

    function loadProgressHandler(loader, resource) {
        console.log("loading: " + resource.name);
        console.log("progress: " + loader.progress + "%");
    }

}

var game, gameMode;

function init() {
    game = new GAME.LodeRunner();
    gameMode = GAME_MODES.GAME_MODE;
    document.body.appendChild(game.view.renderer.view);
    game.initialize();
        /*gameScene = new Container();
        stage.addChild(gameScene);


        var data = levelData1[0].split('');
        //console.log(data);
        var sprite;
        var _x = 0;
        var _y = 0;
        for (var i = 0; i < data.length; i++)
        {
            var key = Object.keys(LEVEL_TILES).filter(function(key) {return LEVEL_TILES[key] === data[i]})[0];

            if (key)
            {
                console.log(key);
                sprite = new Sprite(resources["assets/"+key+".png"].texture);
                sprite.scale.set(0.5,0.5);
                sprite.position.set(_x, _y);
                gameScene.addChild(sprite);
                console.log(sprite.width, sprite.height, sprite.x, sprite.y);
                _x += sprite.width;
                if (i > 0 && i % 28 === 0)
                {
                    _y += sprite.height;
                    _x = 0;
                }
            }
            else
            {
                console.log("key not found "+ key);
            }
        }
*/
        //Render the stage
        //renderer.render(stage);
}

function update() {
    requestAnimationFrame(update);
    game.update();
}
