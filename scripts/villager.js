'use strict';

class Villager extends Wall {
    constructor(pos, size=vec2(1,1), name, dir, task, item) {
        super(pos, size, "villager");

        this.name = name;

        this.talk_type = "intro";
        this.talking = false;

        this.task = task;
        this.task_item = item;
        this.task_completed = false;

        this.pos = pos;
        this.type = "villager";

        this.area = new InteractArea(pos, vec2(2.5,2.5), "talking_area");

        this.dir = dir;
        this.original_dir = this.dir;

        this.head = new Head(pos, this.dir);
        this.body = tile(52);
        
        this.renderOrder = 0;
    }

    render(){ 
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(0.95, 0.95);
        const color = WHITE;
        const angle = 0;
        let mirrored = false;

        drawTile(pos, size, this.body, color, angle, mirrored);
    }

    getName() {
        return this.name;
    }

    setOppositeDir(dir) {
        this.dir = opposites[dir];
        this.head.setDir(this.dir);
    }

    setDir(dir) {
        this.dir = dir;
        this.head.setDir(this.dir);
    }

    setTalkType(talk_type) {
        this.talk_type = talk_type;
    }

    resetTask(task) {
        this.task = task;
        this.task_completed = false;
    }

    completeTask(){
        if (this.task_item == "hat") {
            this.head.setHat();
            hat_medal.unlock();
        }
        else if (this.task_item == "tulip") {
            tulip_medal_0.unlock();
        }
    }
}