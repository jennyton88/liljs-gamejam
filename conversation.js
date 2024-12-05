'use strict';

class Conversation {
    constructor(villager, type, lines) {
        this.name = villager;
        this.type = type;
        this.lines = lines;
        this.counter = 0;
    }

    displayText() {
        drawText(this.name, vec2(2,3));
        drawText(this.lines[this.counter], vec2(2,2));
    }


    moveText() {
        this.counter++;
        
        if (this.counter == this.lines.length) {
            return false;
        }
        
        return true;
    }

    destroy() {
        this.name = "";
        this.type = "";
        this.lines = "";
        this.counter = 0;
    }
}