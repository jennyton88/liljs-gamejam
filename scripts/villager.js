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

        this.tileInfo = tile(29);
        this.tileInfoHead = tile(18);
    }

    render(){ 
        drawTile(vec2(this.pos.x,this.pos.y),vec2(0.95, 0.95),this.tileInfo);
        drawTile(vec2(this.pos.x - 0.08,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);
    }
}