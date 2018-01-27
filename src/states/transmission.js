class Transmission extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'radio-wave')

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)

  }

  update() {}

}

export default Transmission;
