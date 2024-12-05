'use strict';

class Conversation {
    constructor(player_name, villager_name, type, lines) {
        this.player_name = player_name;
        this.villager_name = villager_name;
        this.type = type;
        this.lines = lines;
        this.counter = 0;
    }

    displayText() {
        drawText(this.villager_name, vec2(2,3));
        let line = this.lines[this.counter];
        line = line.replace("{name}", this.player_name);
        drawText(line, vec2(2,2));
    }


    moveText() {
        this.counter++;
        
        if (this.counter == this.lines.length) {
            return false;
        }
        
        return true;
    }

    destroy() {
        this.player_name = "";
        this.villager_name = "";
        this.type = "";
        this.lines = "";
        this.counter = 0;
    }
}