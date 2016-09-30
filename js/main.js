/**
 * Created by alexa on 13.09.2016.
 */
var game, gameMode, GameStorage;
game = new GAME.LodeRunner();
GameStorage = new StorageService('LR_DATA', 'localStorage', game);
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
            "assets/characters.json",
            "assets/enemy.json"
        ])
        .on("progress", loadProgressHandler)
        .load(init);

    function loadProgressHandler(loader, resource) {
        console.log("loading: " + resource.name);
        console.log("progress: " + loader.progress + "%");
    }

}

function init() {
    console.log(resources);
    var storageData = GameStorage.get();
    storageData = null;
    gameMode = GAME_MODES.GAME_MODE;
    document.body.appendChild(game.view.renderer.view);
    game.initialize(storageData);
    GAME.Controls.start();
    update();
}

function update() {
    requestAnimationFrame(update);
    game.update();
}
