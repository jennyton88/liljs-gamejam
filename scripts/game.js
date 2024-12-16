'use strict';


let player;
let interactables = [];
let villagers = {};
let homes = {};
let layers = {};

let view_area = [
    58, 59, 60,
    69, 70, 71,
    80, 81, 82
];

function createLevel() {
    let tile_img = textureInfos[0].image;
    mainContext.drawImage(tile_img, 0, 0);

    let map_offsets = [0, 32, 64, 96];
    const layer_size = vec2(32, 32);

    for (let l = 0; l < map_offsets.length; l++) {
        let tile_layer = new TileLayer(vec2(), vec2(32,32));
        let img_data = mainContext.getImageData(map_offsets[l], 47, tile_img.width , tile_img.height).data;
        for (let i = 0; i < layer_size.x; i++) {
            for (let j = 0; j < layer_size.y; j++) {
                const k = i + tile_img.width * ( layer_size.y - j);

                if (img_data[4 * k + 3] !== 255) { // check alpha
                    continue;
                }

                const rgb = [img_data[4 * k], img_data[4 * k + 1], img_data[4 * k + 2]];
    
                let tile_index = 9999;

                if (tile_type["" + rgb] !== undefined) {
                    tile_index = tile_type["" + rgb];
                }

                if (l == map_offsets.length - 1){
                    setTileCollisionData(vec2(i,j), 1);
                    tile_index = tile_type["-1,-1,-1"];
                }

                let mirrored = false;
                if (l == map_offsets.length - 2) {
                    if (wall_plan[i][j] == 1) {
                        mirrored = true;
                    }
                }

                if (l == map_offsets.length - 3) {
                    if ("" + rgb == "21,8,130") {
                        new Tree(vec2(i,j), vec2(0.80, 0.70));
                        new TreeTop(vec2(i,j));
                        tile_index = tile_type["-1,-1,-1"];
                    }
                }

                let data = new TileLayerData(tile_index, 0, mirrored);
                tile_layer.setData(vec2(i,j), data);
            }
        }

        tile_layer.redraw();
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    setTileFixBleedScale(0.01);
    setCanvasPixelated(true);
    setCanvasFixedSize(vec2(1280, 720));
    setCameraScale(80);

    initTileCollision(vec2(255,255));

    createLevel();

    let random = new RandomGenerator(1);

    let villager = new Villager(vec2(10,18), vec2(0.90, 0.90), "Bob", "down", "find_item", item[random.int(item.length)]);
    let villager_1 = new Villager(vec2(18,18), vec2(0.90, 0.90), "Tulip", "down", "find_item", item[random.int(item.length)]);
    let home = new Home(0, vec2(20,20), vec2(3,3), "Bob", home_plan, home_plan, home_plan, home_plan, vec2(39.5,41.5));
    let viewing_area = new InteractArea(vec2(20, 3), vec2(2,2), "viewing_area");
    interactables.push(villager, villager_1, home, viewing_area);
    villagers[villager.getName()] = villager;
    villagers[villager_1.getName()] = villager_1;
    homes[home.getId()] = home;

    player = new Player(vec2(15.6, 16.3), vec2(0.85, 0.95), "Not_Bob");
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
        player.convo.displayText();
        if (player.making_choice) {
            player.convo.displayChoices();
        }
    }

    if (player.viewing) {
        drawViewArea();
    }

}

function drawViewArea() {
    setCameraScale(220);
    let counter = 3;
    let size = vec2(1,1);
    let pos = vec2(cameraPos.x, cameraPos.y);
    let offset_x = -1;
    let offset_y = 1;

    let color = new Color();
    color.setHex("#2e2e2eff")

    drawRect(vec2(cameraPos.x, cameraPos.y), vec2(20,20), color);
    
    for (let i = 0; i < 9; i++) {
        drawTile(vec2(pos.x + offset_x,pos.y + offset_y), size, tile(view_area[i]));
        offset_x++;
        if (i ==  counter - 1) {
            offset_y--;
            offset_x = -1;
            counter += 3;
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tilesheetexpanded.png']);

