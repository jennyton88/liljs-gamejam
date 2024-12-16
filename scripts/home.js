'use strict';

class Home extends Wall {
    constructor(id, pos, size, owner, furniture_data, floor_plan, outside_floor_plan, exterior, home_pos) {
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
        this.buildHome(this.floor_plan);
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

    buildHome() {
        const house_pos = vec2(7,7);
        let pos = vec2();
        let pos1 = vec2(18,20);
        let tile_layer = new TileLayer(pos1, vec2(house_pos.x + pos1.x, house_pos.y + pos1.y));

        for (let i = 0; i < this.floor_plan.length; i++) {
            for (let j = 0; j < this.floor_plan.length; j++) {
                let mirrored = false;
                if (this.floor_plan[i][j] % 2 == 0) {
                    mirrored = true;
                }

                if (this.floor_plan[i][j] !== 1) {
                    setTileCollisionData(vec2(-2+this.pos.x+ pos1.x + pos.x,this.pos.y+ pos1.y+ pos.y), 1) // position of object house included
                }

                let data = new TileLayerData(tiled[this.floor_plan[i][j]], 0, mirrored);
                tile_layer.setData(vec2(pos.x,pos.y),data);

                pos.y++;
            }
            pos.x++;
            pos.y = 0;
        }

        tile_layer.redraw();
    }
}