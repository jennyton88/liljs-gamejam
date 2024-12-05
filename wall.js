'use strict';

class Wall extends EngineObject {
    constructor(pos, size, type="") {
        super(pos, size);

        this.setCollision();
        this.mass = 0;
        this.type = type;
    }
}