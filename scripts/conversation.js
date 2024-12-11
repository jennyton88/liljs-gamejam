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
        drawRect(vec2(cameraPos.x, cameraPos.y - 3), vec2(10,2), new Color(0,0,0,1));
        drawText(this.villager_name, vec2(cameraPos.x - 4.3, cameraPos.y - 2.35), 0.6);
        let line = this.lines[this.counter];
        line = line.replace("{name}", this.player_name);
        drawText(line, vec2(cameraPos.x, cameraPos.y - 3), 0.4, new Color(1,1,1,1), 0, new Color(1,1,1,1), 'center');
    }


    moveText() {
        this.counter++;
        
        if (this.counter == this.lines.length) {
            this.counter = 0;
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