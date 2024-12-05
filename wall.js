

class Wall extends EngineObject {
    constructor(pos, size) {
        super(pos, size);

        this.setCollision();
        this.mass = 0;
    }
}