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
        this.in_house_id = -1;
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
        this.tileInfoHeadRight = tile(9);
        this.tileInfoHeadTurn = tile(19);
        this.tileInfoHeadBack = tile(7);
        this.tileInfoHeadTurnUp = tile(10);
        
        this.last_dir = this.pos.add(this.velocity.normalize(2));
        this.dir = "down";
    }

    move() {
        let speed = 0.1;
        let vx = 0;
        let vy = 0;

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

        if (keyIsDown('ArrowUp') || keyIsDown('ArrowRight') || keyIsDown('ArrowDown')|| keyIsDown('ArrowLeft')) {
            this.last_dir = this.pos.add(this.velocity.normalize(2));
        }

        if (keyIsDown('ArrowUp') && keyIsDown('ArrowRight')) {
            this.dir = "up_right";
        }
        else if (keyIsDown('ArrowUp') && keyIsDown('ArrowLeft')) {
            this.dir = "up_left";
        }
        else if (keyIsDown('ArrowDown') && keyIsDown('ArrowRight')) {
            this.dir = "down_right";
        }
        else if (keyIsDown('ArrowDown') && keyIsDown('ArrowLeft')) {
            this.dir = "down_left";
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

    interact(interactables) {
        let obj;
        const objects = engineObjectsRaycast(this.pos, this.last_dir, interactables);
        if (objects.length !== 0) {
            obj = objects[0];
            if (obj.type == "home"){
                this.in_house_id = obj.id;
            }
        }

        if (keyWasPressed('Enter')) {
            if (obj !== undefined) {
                if (this.in_area == "talking_area" && obj.type == "villager") {
                    if (this.current_convo !== "") {
                        let movedText = this.current_convo.moveText();
                        if (!movedText) {
                            this.current_convo = this.current_convo.destroy();
                            this.current_convo = "";
                            this.talking = false;
                        }
                    }
                    else {
                        this.talking = true;
                        this.talk(obj.name, obj.talk_type);
                    }
                }
                
                if (this.in_area == "entering_area" && obj.type == "home") {
                    this.enterArea(obj);
                }
            }
            
            if (this.in_area == "leaving_area") {
                this.leaveArea();
            }
        }

        this.in_interact_area = false;
    }

    enterArea(obj) {
        if (!obj.locked) {
            this.teleport(obj.home_pos); // consider where to start
        }
    }

    leaveArea() {
        if (this.in_house_id !== -1) {
            this.teleport(homes[this.in_house_id].door_area.pos);
            this.in_house_id = -1;
        }
    }

    teleport(pos) {
        this.velocity = vec2(0,0);
        this.pos = vec2(pos.x,pos.y);
        this.last_dir = this.pos.add(this.velocity.normalize(2));
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
                villagers[villager_name].talk_type = 0;
                this.talked_with[villager_name] = 0;
            }
            else {
                villagers[villager_name].talk_type = talk;
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
        
        if (this.dir == "down_right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurn);
        }
        else if (this.dir == "down_left"){
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurn, new Color(1,1,1,1), 0, true);
        }
        else if (this.dir == "up_right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurnUp);
        }
        else if (this.dir == "up_left") {
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadTurnUp, new Color(1,1,1,1), 0, true);
        }
        else if (this.dir == "up"){
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadBack);
        }
        else if (this.dir == "down") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHead);
        }
        else if (this.dir == "right") {
            drawTile(vec2(this.pos.x,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadRight);
        }
        else if (this.dir == "left") {
            drawTile(vec2(this.pos.x - 0.2,this.pos.y + 0.4),vec2(0.95,0.95),this.tileInfoHeadRight, new Color(1,1,1,1), 0, true);
        }
        // if (this.in_interact_area) {
        //     drawRect(vec2(this.pos.x - 0.1, this.pos.y + 1.14), vec2(0.4,0.5), new Color(0,0,0,1));
        //     drawText("?", vec2(this.pos.x - 0.1, this.pos.y + 1.1), 0.5);
        // }
    }


}