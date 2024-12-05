'use strict';

class Home extends Wall {
    constructor(pos, size, owner, furniture_data, floor_plan, outside_floor_plan, exterior, door) {
        super(pos, size, "home");

        this.owner = owner;
        this.locked = true;
        this.furniture_data = furniture_data;
        this.floor_plan = floor_plan;
        this.outside_floor_plan = outside_floor_plan;
        this.exterior = exterior;
        this.door = door;
    }

    unlockHome() {
        this.locked = false;
    }

    lockHome() {
        this.locked = true;
    }
}