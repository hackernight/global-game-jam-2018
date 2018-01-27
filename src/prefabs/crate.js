

class Crate extends Phaser.Sprite {

  constructor(game, x, y, twinkle) {
    super(game, x, y, 'crate-object')

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    this.body.setCircle(25);
    this.body.kinematic = true;

  }



  update() {}

}

export default Crate;
