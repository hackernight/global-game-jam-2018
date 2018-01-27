

class Rock extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'space-rock')


    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)


  }



  update() {}

}

export default Rock;
