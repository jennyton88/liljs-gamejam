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
    }

    render(){ 
        drawTile(vec2(this.pos.x,this.pos.y),vec2(0.95, 0.95),this.tileInfo);
        drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);
    }

    getName() {
        return this.name;
    }
}