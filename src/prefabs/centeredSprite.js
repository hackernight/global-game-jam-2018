class CenteredSprite extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, key) {
        super(game, game.world.centerX, game.world.centerY, key);
        game.add.existing(this);
        this.anchor.set(0.5);
    }

    update() {}

}

export default CenteredSprite;