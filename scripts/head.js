class Head extends EngineObject {
    constructor(pos, dir) {
        super(pos);
        this.renderOrder = 1;

        this.head = {
            "up":           tile(43),
            "up_right":     tile(32),
            "right":        tile(42),
            "down_right":   tile(41),
            "down":         tile(30),
            "down_left":    tile(41),
            "left":         tile(42),
            "up_left":      tile(32),
        }
        this.dir = "down";
    }

    render() {
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(0.95, 0.95);
        const color = new Color(1,1,1,1);
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
        drawTile(pos, size, this.head[this.dir], color, angle, mirrored);
    }

    setDir(dir) {
        this.dir = dir;
    }
}