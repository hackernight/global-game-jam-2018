

class Crate extends Phaser.Sprite {

  constructor(game, x, y, twinkle) {
    super(game, x, y, 'chad-nebula')

    this.anchor.setTo(0.5, 0.5);
    this.animations.add('chad-nebula', [0,1,2,3], 4, true);
    this.animations.play("chad-nebula");
    this.alpha = 0.5

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    this.body.setCircle(15);
    this.body.kinematic = true;
    this.type = "crate";
  }



  update() {}

}

export default Crate;
