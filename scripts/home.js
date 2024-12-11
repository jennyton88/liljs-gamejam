'use strict';

class Home extends Wall {
    constructor(id, pos, size, owner, furniture_data, floor_plan, outside_floor_plan, exterior, home_pos=vec2(-20,-20)) {
        super(pos, size, "home");
        this.id = id;
        this.owner = owner;
        this.locked = false;
        this.furniture_data = furniture_data;
        this.floor_plan = floor_plan;
        this.outside_floor_plan = outside_floor_plan;
        this.exterior = exterior;
        this.home_pos = home_pos;
        this.leave_pos = vec2(pos.x, pos.y - 2);
        this.type = "home";
        this.door_area = new InteractArea(vec2(pos.x, pos.y - 2), vec2(1,1), "entering_area");
        this.home_area = new InteractArea(home_pos, vec2(1,1), "leaving_area");
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
}