'use strict';

class Home extends Wall {
    constructor(id, pos, size, owner, home_data, home_pos) {
        super(pos, size, "home");
        this.id = id;
        this.owner = owner;
        this.locked = false;
        this.furniture_data = furniture_data;
        this.home_data = home_data;
        this.home_pos = home_pos;
        this.type = "home";
        this.door_area = new InteractArea(vec2(pos.x, pos.y - 2), vec2(1,1), "entering_area");
        this.home_area = new InteractArea(home_pos, vec2(1,1), "leaving_area");
        this.buildHome();
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

    buildHome() {
        const house_pos = vec2(7,7);
        let pos = vec2();
        let pos1 = vec2(18,20);
        let tile_layer = new TileLayer(pos1, vec2(house_pos.x + pos1.x, house_pos.y + pos1.y));

        for (let i = 0; i < this.home_data.plan.length; i++) {
            for (let j = 0; j < this.home_data.plan.length; j++) {
                if (this.home_data.plan[i][j] !== "f") {
                    let wall_pos = vec2(-2+this.pos.x+ pos1.x + pos.x,this.pos.y+ pos1.y+ pos.y);
                    setTileCollisionData(wall_pos, 1); // position of object house included
                }

                let mirrored = this.home_data.mirrored[i][j];
                let data = new TileLayerData(this.home_data.house_keys[this.home_data.plan[i][j]], 0, mirrored);
                tile_layer.setData(vec2(pos.x,pos.y),data);

                pos.y++;
            }
            pos.x++;
            pos.y = 0;
        }

        tile_layer.redraw();
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