'use strict';

class Home extends Wall {
    constructor(pos, size, owner, furniture_data, floor_plan, outside_floor_plan, exterior, home_pos=vec2(-20,-20)) {
        super(pos, size, "home");

        this.home_info = {
            owner: owner,
            locked: false, // remember to unlock lock this please
            furniture_data: furniture_data,
            floor_plan: floor_plan,
            outside_floor_plan: outside_floor_plan,
            exterior: exterior,
            home_pos: home_pos,
        }
        this.area = new InteractArea(vec2(pos.x, pos.y - 2), vec2(1,1), this.home_info, "entering_area");
    }

    unlockHome() {
        this.home_info.locked = false;
    }

    lockHome() {
        this.home_info.locked = true;
    }
}