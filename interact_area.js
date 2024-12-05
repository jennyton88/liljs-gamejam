'use strict';

class InteractArea extends EngineObject {
    constructor(pos, size, info, area_type) { // need to move around pos when needed
        super(pos, size);

        this.setCollision(true, false, false, false);
        this.mass = 0;
        this.type = "area";
        this.subtype = area_type;
        this.info = info;
    }
}