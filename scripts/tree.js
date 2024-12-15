class Tree extends Wall {
    constructor(pos, size) {
        super(pos, size);

        this.tree = [
            tile(55),tile(56),tile(57),
            tile(66),tile(67),tile(68),
                    tile(78),
        ];
    }

    render() {
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(1, 1);
        const color = new Color(1,1,1,1);
        const angle = 0;
        let mirrored = false;

        let offset_x = -1;
        let offset_y = 2;
        let counter = 3;
        let index = 0;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < counter; j++) {
                drawTile(vec2(pos.x + offset_x, pos.y + offset_y), size, this.tree[index], color, angle, mirrored);
                offset_x++;
                index++;
            }
            offset_y--;
            offset_x = -1;
        }

        drawTile(vec2(pos.x, pos.y), size, this.tree[this.tree.length - 1], color, angle, mirrored);
    }
}