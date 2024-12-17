'use strict';

class Player extends EngineObject {
    constructor(pos, size=vec2(0.90,0.90), name) {
        super(pos, size);

        this.setCollision();
        this.damping = 0.95;

        this.name = name;

        this.in_interact_area = false;
        this.in_area = "";

        this.talking = false;
        this.convo = "";
        this.making_choice = false;

        this.in_house_id = -1;

        this.viewing = false;

        this.talked_with = {
        };
        this.met = {
        };
        this.task_list = {

        };
        this.items = {
            "tulip": 0,
            "hat": 0,
        };

        this.head = {
            "up":           tile(7),
            "up_right":     tile(10),
            "right":        tile(9),
            "down_right":   tile(19),
            "down":         tile(18),
            "down_left":    tile(19),
            "left":         tile(9),
            "up_left":      tile(10),
        }
        this.body = tile(29);

        this.last_dir = this.pos.add(this.velocity.normalize(2));
        this.dir = "down";
    }

    move() {
        let speed = 0.1;
        let vx = 0;
        let vy = 0;

        if (keyIsDown('ShiftLeft') || keyIsDown('ShiftRight')) {
            speed = 0.2;
        }


        if (keyIsDown('ArrowUp')) {
            vy = speed;
            this.dir = "up";
        }
        if (keyIsDown('ArrowRight')) {
            vx = speed;
            this.dir = "right";
        }
        if (keyIsDown('ArrowDown')) {
            vy = -speed;
            this.dir = "down";
        }
        if (keyIsDown('ArrowLeft')) {
            vx = -speed;
            this.dir = "left";
        }

        this.velocity = vec2(vx * this.damping, vy * this.damping);

        if (keyIsDown('ArrowUp') 
            || keyIsDown('ArrowRight') 
            || keyIsDown('ArrowDown')
            || keyIsDown('ArrowLeft')) {
            this.last_dir = this.pos.add(this.velocity.normalize(2));
        }

        if (keyIsDown('ArrowUp')) {
            if (keyIsDown('ArrowRight')) {
                this.dir = "up_right";
            }
            else if (keyIsDown('ArrowLeft')) {
                this.dir = "up_left";
            }
        }
        else if (keyIsDown('ArrowDown')) {
            if (keyIsDown('ArrowRight')) {
                this.dir = "down_right";
            }
            else if (keyIsDown('ArrowLeft')) {
                this.dir = "down_left";
            }
        }
    }

    collideWithObject(obj) {
        if (obj.type == "area") {
            this.in_interact_area = true;
            this.in_area = obj.subtype;

            return false;
        }

        this.velocity = vec2(0,0);
        this.in_interact_area = false;
        this.in_area = "";

        return true;
    }

    pickUp(tiles) {
        if (!this.talking && (keyWasPressed('Enter'))) {
            let pos = vec2(this.pos.x, this.pos.y);
            let offset_x = 0;
            let offset_y = 0;
    
            if (this.dir == "up") {
                offset_y++;
            }
            else if (this.dir == "up_right") {
                offset_y++;
                offset_x++;
            }
            else if (this.dir == "right") {
                offset_x++;
            }
            else if (this.dir == "down_right") {
                offset_x++;
                offset_y--;
            }
            else if (this.dir == "down") {
                offset_y--;
            }
            else if (this.dir == "down_left") {
                offset_y--;
                offset_x--;
            }
            else if (this.dir == "left") {
                offset_x--;
            }
            else if (this.dir == "up_left") {
                offset_x--;
                offset_y++;
            }
    
            pos.x = pos.x + offset_x;
            pos.y = pos.y + offset_y;
    
            let data = tiles.getData(pos);

            if (data.tile == undefined) {
                return;
            }
            else {
                if (data.tile !== 6 && data.tile !== 17)  {
                    if (data.tile == item["tulip"]) {
                        this.items["tulip"]++;
                    }
                    else if (data.tile == item["hat"]) {
                        this.items["hat"]++;
                    }
                    let floor_pos = vec2(Math.floor(pos.x), Math.floor(pos.y));
                    data.tile = undefined;
                    tiles.setData(floor_pos, data, true);
                }
            }

        }
    }

    interact(interactables) {
        if (keyWasPressed('Enter')) {
            const objects = engineObjectsRaycast(this.pos, this.last_dir, interactables);
            let obj = (objects.length !== 0)? objects[0]: undefined;

            if (obj !== undefined) {
                if (obj.type == "villager" && this.in_area == "talking_area") {
                    if (!this.talking) {
                        this.talk(obj);
                    }
                    else if (this.talking && this.making_choice) {
                        this.making_choice = false;
                        let choice = this.convo.getChoice();
                        this.convo.displayResult();
                        this.convo.resetChoice();

                        if (choice == 0) {
                            this.task_list[obj.name] = obj.task_item;
                        }
                        // else if (choice == 1) {
                        //     this.task_list[obj.name] = "no";
                        // }
                    }
                    else if (this.talking) {
                        if (!this.convo.moveText()) { // finished their dialogue loop
                            villagers[obj.name].setDir(obj.original_dir);
                            this.convo = this.convo.destroy();
                            this.convo = "";
                            this.talking = false;
                        }
                    }
                }
                
                if (this.in_area == "entering_area" && obj.type == "home" && this.dir == "up") {
                    this.enterArea(obj);
                    this.in_house_id = obj.id;
                }
            }
            
            if (this.in_area == "leaving_area" && this.dir == "down") {
                this.leaveArea();
            }

            if (this.in_area == "viewing_area") {
                this.viewing = !this.viewing;
                if (!this.viewing) {
                    setCameraScale(80);
                }
            }
        }

        if (this.talking && this.making_choice) {
            if (this.convo.max_choice !== -1) {
                if (keyWasPressed('ArrowDown')) {
                    this.convo.moveChoice(-1);
                }
                else if (keyWasPressed('ArrowUp')) {
                    this.convo.moveChoice(1);
                }
            }
        }

        this.in_interact_area = false;
    }

    enterArea(obj) {
        if (!obj.locked && this.dir == "up") {
            this.teleport(vec2(obj.home_pos.x, obj.home_pos.y));
        }
    }

    leaveArea() {
        if (this.in_house_id !== -1 && this.dir == "down") {
            this.teleport(homes[this.in_house_id].door_area.pos);
            this.in_house_id = -1;
        }
    }

    teleport(pos) {
        this.velocity = vec2(0,0);
        this.pos = vec2(pos.x,pos.y);
        this.last_dir = this.pos.add(this.velocity.normalize(2));
    }

    talk(villager) {
        this.talking = true;
        let name = villager.name;
        let talk_type = villager.talk_type;

        villagers[name].setOppositeDir(this.dir);

        if (this.met[name]) {
            let talk = this.talked_with[name];

            let key = `${name}_${talk}`;

            if (villager_convos[key] == undefined) { // reset loop
                if (this.task_list[name] !== "complete" 
                    && this.task_list[name] == undefined 
                    && villagers[name].task !== "" 
                    && !villagers[name].task_completed) {
                    talk_type = villagers[name].task;
                }
                else if (this.task_list[name] !== "complete" 
                    && this.task_list[name] !== undefined 
                    && !villagers[name].task_completed) {
                    talk_type = `${villagers[name].task}_question`;
                }
                else {
                    talk_type = 0;
                    talk = 0;
                }
            }
            else {
                talk_type = talk;
            }

            talk++;
            this.talked_with[name] = talk;
        }
        else if (talk_type == "intro") {
            this.met[name] = true;
            this.talked_with[name] = 0;
        }

        let key = `${name}_`;

        if (this.task_list[name] !== "complete" 
            && this.task_list[name] == undefined 
            && villagers[name].task !== "" 
            && talk_type == villagers[name].task) {
            key = "";
            this.making_choice = true;
        }

        if (this.task_list[name] !== "complete" 
            && this.task_list[name] !== undefined) {
            key = "";

            let item_amt = this.items[this.task_list[name]];
            if (item_amt > 0) {
                this.items[this.task_list[name]]--;
                villagers[name].task_completed = true;
                talk_type = `${villagers[name].task}_success`;
                this.task_list[name] = "complete";
                villagers[name].completeTask();
            }
        }

        let convo = villager_convos[`${key}${talk_type}`];
        this.convo = new Conversation(this.name, name);
        this.convo.setUpWords(convo);

        if (this.making_choice) {
            this.convo.setUpChoices(talk_type);
        }

        if (talk_type == "intro") { talk_type = 0; }

        villagers[name].setTalkType(talk_type);
    }

    moveCamera() {
        let x = this.pos.x;
        let y = this.pos.y;


        if (this.in_house_id == -1) {
            if (this.pos.x > 24.1) {
                x = 24.1;
            }
            else if (this.pos.x < 8) {
                x = 8;
            }
    
            if (this.pos.y < 4) {
                y = 4;
            }
            else if (this.pos.y > 29) {
                y = 29;
            }
        }

        setCameraPos(vec2(x, y));
    }

    render(){ 
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(0.95, 0.95);
        const color = new Color(1,1,1,1);
        const angle = 0;
        let mirrored = false;

        drawTile(pos, size, this.body, color, angle, mirrored);

        const offset_y = 0.4;

        if (this.dir == "down_left" 
            || this.dir == "up_left" 
            || this.dir == "left") {
            pos.x -= 0.2;
            mirrored = true;
        }

        pos.y += offset_y;
        drawTile(pos, size, this.head[this.dir], color, angle, mirrored);
    }


}