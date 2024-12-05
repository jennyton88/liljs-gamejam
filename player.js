'use strict';

class Player extends EngineObject {

    constructor(pos, size=vec2(0.95,0.95), name) {
        super(pos, size);

        this.setCollision();
        this.damping = 0.95;
        this.talking = false;
        this.current_convo = "";
        this.in_interact_area = false;
        this.found_info = "";
        this.name = name;
        this.pause = false;
        this.talked_with = {
            // Get villager names "Bob": 2 times today, get convos
            // introduced : true/ false or -1 on the talked with. reset to 0 when introduced and new day starts if haven't introduced and day resets, stay at -1
        };
        this.friendship_level = {
            // villager: lvl
        };
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
                    this.in_area = obj.subtype;
                }
                else {
                    this.in_interact_area = false;
                    this.found_info = "";
                    this.in_area = "";
                }
                
            }
            else if (obj.subtype == "entering_area") {
                if (this.velocity.direction() == 0) { // TODO fix this
                    this.in_interact_area = true;
                    this.found_info = obj.info;
                    this.in_area = obj.subtype;
                }
                else {
                    this.in_interact_area = false;
                    this.found_info = "";
                    this.in_area = "";
                }
            }

            return false;
        }

        return true;
    }

    interact() {
        if (keyWasPressed('Enter')) {
            if (this.in_area == "talking_area") {
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
                    this.talk(this.found_info.name, this.found_info.talk_type);
                }
            }
            else if (this.in_area == "entering_area") {
                this.enterArea();
            }
        }
    }

    enterArea() {
        if (!this.found_info.locked) {
            this.teleport(this.found_info.home_pos); // consider where to start
        }
    }

    teleport(pos) {
        // this.pause = true;
        this.velocity = vec2(0,0);
        this.pos = pos;
        // this interact area = false
    }

    talk(villager_name, talk_type) {
        let convo = villager_convos[villager_name + "_" + talk_type];
        this.current_convo = new Conversation(this.name, villager_name, talk_type, convo);
    }
}