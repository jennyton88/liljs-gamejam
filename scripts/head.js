class Head extends EngineObject {
    constructor(pos, dir) {
        super(pos);
        this.renderOrder = 1;

        this.head = {
            "up":           [tile(43), tile(43)],
            "up_right":     [tile(32), tile(54)],
            "right":        [tile(42), tile(76)],
            "down_right":   [tile(41), tile(87)],
            "down":         [tile(30), tile(65)],
            "down_left":    [tile(41), tile(87)],
            "left":         [tile(42), tile(76)],
            "up_left":      [tile(32), tile(54)],
        }
        this.dir = dir;

        this.hat = tile(53);
        this.have_hat = false;
    }

    render() {
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(0.95, 0.95);
        const color = WHITE;
        const angle = 0;
        let mirrored = false;

        const offset_y = 0.4;

        if (this.dir == "down_left" 
            || this.dir == "up_left" 
            || this.dir == "left") {
            pos.x -= 0.2;
            mirrored = true;
        }

        pos.y += offset_y;
        const head_dir = tulip_medal_1.unlocked? this.head[this.dir][1]: this.head[this.dir][0];
        drawTile(pos, size, head_dir, color, angle, mirrored);

        if (this.have_hat) {
            drawTile(vec2(pos.x, pos.y+0.5), size, this.hat, color, angle, mirrored);
        }
    }

    setDir(dir) {
        this.dir = dir;
    }

    setHat() {
        this.have_hat = true;
    }
}