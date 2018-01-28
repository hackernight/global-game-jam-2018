

class BlackHole extends Phaser.Sprite {

    constructor(game, x, y) {
      super(game, x, y, 'space-rock')
  
  
      game.physics.enable(this, Phaser.Physics.P2JS);
      game.add.existing(this)
      this.body.isDeleted = false;
      this.body.setCircle(25);
      this.body.kinematic = true;
      this.type = "blackHole";
      this.body.myMass = 1000;
      this.tint = 0x00aaff;
  
  
    }
  
  
  
    update() {}
  
  }
  
  export default BlackHole;
  