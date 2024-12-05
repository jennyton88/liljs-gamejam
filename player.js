'use strict';

class Player extends EngineObject {

    constructor(pos, size) {
        super(pos, size);

        this.setCollision();
        this.damping = 0.95;
    }

    move() {
        let speed = 0.1;
        let vx = 0;
        let vy = 0;

        if (keyIsDown('ArrowUp')) {
            vy = speed;
        }

        if (keyIsDown('ArrowRight')) {
            vx = speed;
        }

        if (keyIsDown('ArrowDown')) {
            vy = -speed;
        }

        if (keyIsDown('ArrowLeft')) {
            vx = -speed;
        }



        this.velocity = vec2(vx * this.damping, vy * this.damping);
    }

    collideWithObject(obj) {
        this.velocity = vec2(0,0);

        return true;
    }
}