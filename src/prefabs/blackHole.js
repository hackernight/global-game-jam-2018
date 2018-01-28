

class BlackHole extends Phaser.Sprite {

    constructor(game, x, y) {
      super(game, x, y, 'black-hole')

      this.anchor.setTo(0.5, 0.5);
  	  this.animations.add('black-hole', [4,5,6,7], 4, true);
      this.animations.play("black-hole");

      var randoFactor = 1;
      if (this.game.global.win==1){
        randoFactor = this.game.rnd.realInRange(.01, 1)
      }

      this.scale.x = this.game.global.level.blackHoleScale * randoFactor;
      this.scale.y = this.game.global.level.blackHoleScale * randoFactor;

      game.physics.enable(this, Phaser.Physics.P2JS);
      game.add.existing(this)
      this.body.isDeleted = false;
      this.body.setCircle(25);
      this.body.kinematic = true;
      this.type = "blackHole";
      this.body.myMass = this.game.global.level.blackHoleMass * randoFactor;

    }



    update() {}

  }

  export default BlackHole;
