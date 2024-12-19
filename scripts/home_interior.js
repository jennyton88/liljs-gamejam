'use strict';

class HomeInterior extends EngineObject {
    constructor(pos, home_data) {
        super(pos);

        this.house_keys = home_data.house_keys;
        this.plan = home_data.plan;
        this.furniture = home_data.furniture;
        this.mirrored= home_data.mirrored;
        this.home_pos = pos;
        this.walls =[];
        this.buildHome();
    }

    buildHome() {
        const offset_x = -3;
        const offset_y = -1;
        let pos = vec2(this.home_pos.x + offset_x,this.home_pos.y + offset_y);

        for (let i = 0; i < this.plan.length; i++) {
            for (let j = 0; j < this.plan[i].length; j++) {
                if (this.plan[i][j] !== "f") {
                    const wall = new Wall(vec2(pos.x, pos.y), vec2(1,1));
                    wall.tileInfo = tile(6);
                    this.walls.push(wall);
                }
                if (this.furniture.pos.x == i && this.furniture.pos.y == j) {
                    const wall = new Wall(vec2(pos.x, pos.y), vec2(1,1));
                    wall.tileInfo = tile(6);
                    this.walls.push(wall);
                }
                pos.y++;
            }

            pos.x++;
            pos.y = this.home_pos.y + offset_y;
        }
    }

    render() {
        const offset_x = -3;
        const offset_y = -1;
        let pos = vec2(this.home_pos.x + offset_x,this.home_pos.y + offset_y);
        
        for (let i = 0; i < this.plan.length; i++) {
            for (let j = 0; j < this.plan[i].length; j++) {
                let h_tile = tile(this.house_keys[this.plan[i][j]]);

                let mirrored = this.mirrored[i][j];
                let color = WHITE;
                let angle = 0;
                let size = vec2(1,1);

                drawTile(vec2(pos.x, pos.y), size, h_tile, color, angle, mirrored);

                if (this.furniture.pos.x == i && this.furniture.pos.y == j) {
                    drawTile(vec2(pos.x, pos.y), size, tile(this.furniture.sprite));
                }
                pos.y++;
            }
            pos.x++;
            pos.y = this.home_pos.y + offset_y;
        }
    }
}