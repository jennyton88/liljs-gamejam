'use strict';

class Conversation {
    constructor(villager, type, lines) {
        this.name = villager;
        this.type = type;
        this.lines = lines;
    }

    displayText() {
        drawTextScreen(this.name, mainCanvasSize.scale(.2), 80);
    }
}