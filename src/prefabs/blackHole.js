

class BlackHole extends Phaser.Sprite {

    constructor(game, x, y) {
      super(game, x, y, 'black-hole')

      this.anchor.setTo(0.5, 0.5);
      this.animations.add('black-hole', [0,1,2,3,4,5], 6, true);
      this.animations.play("black-hole");
  
        this.scale.x = 2.5
        this.scale.y = 2.5

      game.physics.enable(this, Phaser.Physics.P2JS);
      game.add.existing(this)
      this.body.isDeleted = false;
      this.body.setCircle(25);
      this.body.kinematic = true;
      this.type = "blackHole";
      this.body.myMass = 1000;
  
    }
  
  
  
    update() {}
  
  }
  
  export default BlackHole;
  