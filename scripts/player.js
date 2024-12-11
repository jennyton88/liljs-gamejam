'use strict';

class Player extends EngineObject {

    constructor(pos, size=vec2(0.90,0.90), name) {
        super(pos, size);

        this.setCollision();
        this.damping = 0.95;
        this.talking = false;
        this.current_convo = "";
        this.in_interact_area = false;
        this.in_area = "";
        this.found_info = "";
        this.name = name;
        this.pause = false;
        this.talked_with = {

        };
            // Get villager names "Bob": 2 times today, get convos
            // introduced : true/ false or -1 on the talked with. reset to 0 when introduced and new day starts if haven't introduced and day resets, stay at -1
        this.friendship_level = {
            // villager: lvl
        };
        this.met = {

        };

        this.tileInfo = tile(29);
        this.tileInfoHead = tile(18);
        
        this.last_dir = this.pos.add(this.velocity.normalize(2));
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

        if (keyIsDown('ArrowUp') || keyIsDown('ArrowRight') || keyIsDown('ArrowDown')|| keyIsDown('ArrowLeft')) {
            this.last_dir = this.pos.add(this.velocity.normalize(2));
        }
    }

    collideWithObject(obj) {
        if (obj.type !== "area") {
            this.velocity = vec2(0,0);
        }
        else {
            this.in_interact_area = true;
            this.in_area = obj.subtype;
            return false;
        }

        return true;
    }

    interact(interactables) {
        let objects = engineObjectsRaycast(this.pos, this.last_dir, interactables);
        if (objects.length !== 0) {
            if (this.in_area == "talking_area") {
                for(let i = 0; i < objects.length; i++) {
                    if (objects[i].type == "villager") {
                        this.found_info = objects[i].info;
                        break;
                    }
                }
            }
            else if (this.in_area == "entering_area") {
                for(let i = 0; i < objects.length; i++) {
                    if (objects[i].type == "home") {
                        this.found_info = objects[i].info;
                        break;
                    }
                }
            }
            else {
                this.found_info = "";
                this.in_interact_area = false;
                this.in_area = "";
            }
        }
        else {
            this.found_info = "";
            this.in_interact_area = false;
            this.in_area = "";
        }

        if (keyWasPressed('Enter')) {
            if (this.found_info !== "") {
                if (this.in_area == "talking_area" && this.found_info.type == "villager") {
                    if (this.current_convo !== "") {
                        let movedText = this.current_convo.moveText();
                        if (!movedText) {
                            this.current_convo = this.current_convo.destroy();
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
                else if (this.in_area == "entering_area" && this.found_info.type == "home") {
                    this.enterArea();
                }
            }
        }
    }

    enterArea() {
        if (!this.found_info.locked) {
            this.teleport(this.found_info.home_pos); // consider where to start
            this.in_interact_area = false;
            this.found_info = "";
            this.in_area = "";
        }
    }

    teleport(pos) {
        // this.pause = true;
        this.velocity = vec2(0,0);
        this.pos = vec2(pos.x, pos.y);
        // this interact area = false
    }

    talk(villager_name, talk_type) {
        let t_type = talk_type;
        console.log(t_type)
        let convo = "";
        if (this.met[villager_name] == undefined) {
            this.met[villager_name] = true;
            this.talked_with[villager_name] = 0;
            this.friendship_level[villager_name] = 0;
            t_type = "intro";
        }
        else if (this.met[villager_name]) {
            this.talked_with[villager_name]++;
            let talk = this.talked_with[villager_name];
            if (villager_convos[villager_name + "_" + talk] == undefined) {
                villagers[villager_name].info.talk_type = 0;
                this.talked_with[villager_name] = 0;
            }
            else {
                villagers[villager_name].info.talk_type = talk;
                this.talked_with[villager_name] = talk;
            }
        }
// set villager talk type
        convo = villager_convos[villager_name + "_" + t_type];
        this.current_convo = new Conversation(this.name, villager_name, talk_type, convo);
    }

    moveCamera() {
        setCameraPos(this.pos);
    }

    render(){ 
        
        drawTile(vec2(this.pos.x, this.pos.y),vec2(0.95, 0.95),this.tileInfo);
        drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);
        if (this.in_interact_area) {
            drawRect(vec2(this.pos.x - 0.1, this.pos.y + 1.14), vec2(0.4,0.5), new Color(0,0,0,1));
            drawText("?", vec2(this.pos.x - 0.1, this.pos.y + 1.1), 0.5);
        }
    }


}