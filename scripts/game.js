'use strict';

let player;
let interactables = [];

const tile_type = {
    "9999" : 9, // unknown
    "6,85,0": 17, // lilypads
    "255,94,26": 16, // flowers
    "77,166,255": 31, // water
    "143,222,93": 8, // grass
    "241,249,3": 21, // sand
    "255,181,112": 20, //path
};


let layers = [];
let villagers = {};

function createLevel() {
    const maps_start = 1;
    const maps_end = 4;
    
    const tile_collision_layer_size = vec2(32, 32);
    initTileCollision(tile_collision_layer_size);

    for (let j = maps_start; j < maps_end; j++) {
        let tile_img = textureInfos[j].image;
        mainContext.drawImage(tile_img, 0, 0);

        let img_data = mainContext.getImageData(0, 0, tile_img.width , tile_img.height).data;

        let pos = vec2(0,0);
        let tile_layer = new TileLayer(pos, tile_collision_layer_size);

        for (pos.x = 0; pos.x < tile_collision_layer_size.x; pos.x++) {
            for (pos.y = tile_collision_layer_size.y; pos.y--;) {
                // check if this pixel is set
                const i = pos.x + tile_img.width * ( tile_collision_layer_size.y - pos.y);
                if (!img_data[4 * i]) {
                    continue;
                }

                const rgb = [img_data[4 * i], img_data[4 * i + 1], img_data[4 * i + 2]];

                let tile_index = tile_type["" + rgb] !== "undefined"? tile_type["" + rgb]: 9999;

                let data = new TileLayerData(tile_index);

                if (j == maps_start) {
                    setTileCollisionData(pos, 1);
                }
                
                tile_layer.setData(pos, data);
            }
        }
        
        tile_layer.redraw();
        layers.push(tile_layer);
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    setCanvasPixelated(true);
    setCanvasFixedSize(vec2(1280, 720));
    setCameraScale(80);

    createLevel();


    let villager = new Villager(vec2(10,18), vec2(0.90, 0.90), "Bob");
    let home = new Home(vec2(20,20), vec2(3,3), "Bob", -1, -1, -1, -1);
    interactables.push(villager, home);
    villagers[villager.getName()] = villager;

    player = new Player(vec2(16, 18), vec2(0.95, 0.95), "Not_Bob");
    player.moveCamera();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    if (!player.talking && !player.pause) {
        player.move();
    }

    if (player.in_interact_area) {
        player.interact(interactables);
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
    player.moveCamera();
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    if (player.talking) {
        player.current_convo.displayText();
    }

}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['./assets/tilesheet.png', './assets/tile_walls.png', './assets/ground.png', './assets/plant_life.png']);

