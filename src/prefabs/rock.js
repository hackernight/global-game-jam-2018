

class Rock extends Phaser.Sprite {

  constructor(game, x, y, image) {
    super(game, x, y, image)


    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    this.body.setCircle(25);
    this.body.kinematic = true;
    this.type = "rock";
    this.body.myMass = 0;


  }



  update() {}

}

export default Rock;
