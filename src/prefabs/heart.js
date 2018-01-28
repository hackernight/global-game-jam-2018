

class Heart extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'heartParticle')

    game.add.existing(this)


  }

  update() {}

}

export default Heart;
