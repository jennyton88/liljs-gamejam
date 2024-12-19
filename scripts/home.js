'use strict';

class Home extends Wall {
    constructor(id, pos, size, owner, home_data, home_pos) {
        super(pos, size, "home");
        this.id = id;
        this.owner = owner;
        this.locked = false;
        this.home_data = home_data;
        this.home_pos = home_pos;
        this.type = "home";
        this.door_area = new InteractArea(vec2(pos.x, pos.y - 2), vec2(1,1), "entering_area");
        this.home_area = new InteractArea(this.home_pos, vec2(1,1), "leaving_area");
        this.home = new HomeInterior(this.home_pos, this.home_data);
        this.home_front = [
            tile(61), tile(62), tile(63),
            tile(72), tile(73), tile(74),
            tile(83), tile(84), tile(85),
        ];
    }

    unlockHome() {
        this.locked = false;
    }

    
    lockHome() {
        this.locked = true;
    }

    getId() {
        return this.id;
    }

    render() {
        let counter = 3;
        let size = vec2(1,1);
        let pos = vec2(this.pos.x, this.pos.y);
        let offset_x = -1;
        let offset_y = 1;

        for (let i = 0; i < 9; i++) {
            drawTile(vec2(pos.x + offset_x,pos.y + offset_y), size, this.home_front[i]);
            offset_x++;
            if (i ==  counter - 1) {
                offset_y--;
                offset_x = -1;
                counter += 3;
            }
        }
    }
}