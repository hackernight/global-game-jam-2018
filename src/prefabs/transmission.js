class Transmission extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'radio-anim')
    
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('radio-anim', [0,1], 2, true);
    this.animations.play("radio-anim");

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    this.body.setCircle(25);
    this.body.collideWorldBounds = false;
    this.body.myMass = 100;

  }

  bringOutYerDead(){
    if (this.body && this.body.isDeleted==true){
      this.destroy();
    }
  }

  iAmOuttaHere(){
    this.body.isDeleted = true;
  }


  update() {
    if(this.x > this.game.width ||
       this.x < 0 ||
       this.y > this.game.height ||
       this.y < 0
     ) {
      if(this.body) {
        this.body.isDeleted = true;
      }
      this.kill();
      this.destroy();
    }
  }
}

export default Transmission;
