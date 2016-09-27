/**
 * Created by alexa on 13.09.2016.
 */
var GameStorage = new StorageService('LR_DATA', 'Local');
GameStorage.init();
document.addEventListener("DOMContentLoaded", function(event) {
    onReady();
});

function onReady() {
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
    console.log(GameStorage.get());
    game = new GAME.LodeRunner();
    gameMode = GAME_MODES.GAME_MODE;
    document.body.appendChild(game.view.renderer.view);
    game.initialize();
    GAME.Controls.start();
    update();
}

function update() {
    requestAnimationFrame(update);
    game.update();
}
