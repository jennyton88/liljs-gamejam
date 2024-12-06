'use strict';

class Villager extends Wall {
    constructor(pos, size=vec2(1,1), name) {
        super(pos, size, "villager");

        this.info = {
            name: name,
            talk_type: "0",
            talking: false,
            pos: pos,
            type: "villager" // could be better
        }
        this.area = new InteractArea(pos, vec2(2.5,2.5), "talking_area");

        this.tileInfo = tile(64);
        this.tileInfoHead = tile(128);
        this.tileInfoEars = tile(68);
    }

    render(){ 
        drawTile(vec2(this.pos.x,this.pos.y),vec2(0.95, 0.95),this.tileInfo);
        drawTile(vec2(this.pos.x,this.pos.y - 0.8),vec2(0.95,0.95),this.tileInfoHead);
        drawTile(vec2(this.pos.x, this.pos.y + 0.6), vec2(0.95,0.95), this.tileInfoEars);
    }
}