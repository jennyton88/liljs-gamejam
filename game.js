/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

let player;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    player = new Player(vec2(5,1), vec2(0.95, 0.95), "Not_Bob"); // same name villager check
    new Home(vec2(5,5), vec2(3,3), "Bob", -1, -1, -1, -1);
    new Villager(vec2(1,1), vec2(0.95, 0.95), "Bob", ["hello!", "bye!"]);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    if (!player.talking || !player.pause) {
        player.move();
    }

    if (player.in_interact_area) {
        player.interact();
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
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
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);