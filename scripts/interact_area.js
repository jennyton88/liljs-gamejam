'use strict';

class InteractArea extends EngineObject {
    constructor(pos, size, area_type) { // need to move around pos when needed
        super(pos, size);

        this.setCollision(true, false, false, false);
        this.mass = 0;
        this.type = "area";
        this.subtype = area_type;
        this.tileInfo = new TileInfo(vec2(112,0), vec2(1,1),0,0);
    }
}