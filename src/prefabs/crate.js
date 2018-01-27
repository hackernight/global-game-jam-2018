

class Crate extends Phaser.Sprite {

  constructor(game, x, y, twinkle) {
    super(game, x, y, 'crate-object')


    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)


  }



  update() {}

}

export default Crate;
