'use strict';

class Villager extends Wall {
    constructor(pos, size=vec2(1,1), name) {
        super(pos, size, "villager");

        this.name = name,
        this.talk_type = 0,
        this.talking = false,
        this.pos = pos,
        this.type = "villager" // could be better
        this.area = new InteractArea(pos, vec2(2.5,2.5), "talking_area");

        this.tileInfo = tile(29);
        this.tileInfoHead = tile(18);
        this.tileInfoHeadRight = tile(9);
        this.tileInfoHeadTurn = tile(19);
        this.tileInfoHeadBack = tile(7);
        this.tileInfoHeadTurnUp = tile(10);
        this.dir = "down";
    }

    render(){ 
        drawTile(vec2(this.pos.x,this.pos.y),vec2(0.95, 0.95),this.tileInfo);
        // drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);

        if (this.dir == "down_right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurn);
        }
        else if (this.dir == "down_left"){
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurn, new Color(1,1,1,1), 0, true);
        }
        else if (this.dir == "up_right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurnUp);
        }
        else if (this.dir == "up_left") {
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurnUp, new Color(1,1,1,1), 0, true);
        }
        else if (this.dir == "up"){
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadBack);
        }
        else if (this.dir == "down") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);
        }
        else if (this.dir == "right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadRight);
        }
        else if (this.dir == "left") {
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadRight, new Color(1,1,1,1), 0, true);
        }
    }

    getName() {
        return this.name;
    }

    setOppositeDir(dir) {
        this.dir = opposites[dir];
    }
}