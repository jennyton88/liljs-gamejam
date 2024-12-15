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
        
        this.dir = dir;
        this.original_dir = this.dir;
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

    getName() {
        return this.name;
    }

    setOppositeDir(dir) {
        this.dir = opposites[dir];
    }

    setDir(dir) {
        this.dir = dir;
    }

    setTalkType(talk_type) {
        this.talk_type = talk_type;
    }

    resetTask(task) {
        this.task = task;
        this.task_completed = false;
    }
}