class Star extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'twinkle-star')

        this.animations.add('twinkle-star', [1,2], 3, true);
    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)


  }

  update() {}

}

export default Star;
