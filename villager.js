'use strict';

class Villager extends Wall {
    constructor(pos, size=vec2(1,1), name, text) {
        super(pos, size, "villager");

        this.villager_info = {
            name: name,
            talk_type: "test",
            lines: text,
            talking: false,
            pos: pos,
        }
        this.area = new InteractArea(pos, vec2(2.5,2.5), this.villager_info, "talking_area");
    }
}