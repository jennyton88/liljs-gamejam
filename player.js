'use strict';

class Player extends EngineObject {

    constructor(pos, size=vec2(0.95,0.95)) {
        super(pos, size);

        this.setCollision();
        this.damping = 0.95;
        this.talking = false;
        this.current_convo = "";
        this.in_talking_area = false;
        this.found_info = "";
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
        if (obj.type !== "area") {
            this.velocity = vec2(0,0);
        }
        else {
            if (obj.subtype == "talking_area") {
                if (this.velocity.direction() == 0) { // TODO fix this
                    this.in_interact_area = true;
                    this.found_info = obj.info;
                }
                else {
                    this.in_interact_area = false;
                    this.found_info = "";
                }
                
            }

            return false;
        }

        if (keyWasPressed('Enter')) {
            if (obj.type == "home") {
                 //     this.enterHouse(obj);
            }
        }

        return true;
    }

    interact() {
        if (keyWasPressed('Enter')) {
            if (this.current_convo !== "") {
                let movedText = this.current_convo.moveText();
                if (!movedText) {
                    this.current_convo.destroy();
                    this.current_convo = "";
                    this.found_info = "";
                    this.talking = false;
                }
            }
            else {
                this.talking = true;
                this.talk(this.found_info.name, this.found_info.talk_type, this.found_info.lines);
            }
        }
    }

    // enterHouse(obj) {
    //     if (!obj.locked && keyIsDown('Enter')) {
    //         moveToHouse(obj.name, obj);
    //     }
    // }

    talk(name, talk_type, lines) {
        this.current_convo = new Conversation(name, talk_type, lines);
    }
}