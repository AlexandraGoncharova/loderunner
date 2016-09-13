/**
 * Created by alexa on 13.09.2016.
 */
document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;


    var stage = new Container(),
        renderer = autoDetectRenderer(960, 400);
    document.body.appendChild(renderer.view);


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
            "assets/runner1.png"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource) {
        console.log("loading: " + resource.name);
        console.log("progress: " + loader.progress + "%");
    }

    function setup() {
        console.log("setup");


    }
}