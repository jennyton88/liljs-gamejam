class Tree extends Wall {
    constructor(pos, size) {
        super(pos, size);

        this.tree = tile(78);

        this.renderOrder = 0;
    }

    render() {
        let pos = vec2(this.pos.x, this.pos.y);
        const size = vec2(1, 1);
        const color = new Color(1,1,1,1);
        const angle = 0;
        let mirrored = false;

        drawTile(vec2(pos.x, pos.y), size, this.tree, color, angle, mirrored);
    }
}