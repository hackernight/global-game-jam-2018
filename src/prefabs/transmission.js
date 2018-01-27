class Transmission extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'radio-wave')

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    this.body.setCircle(25);
    this.body.collideWorldBounds = false;
    this.events.onOutOfBounds.add(this.iAmOuttaHere, this );
    //this.outOfBoundsKill = true;
    

  }

  bringOutYerDead(){
    if (this.body && this.body.isDeleted==true){
      this.destroy();
    }
  }

  iAmOuttaHere(){
    console.log("i'm outta here")
    this.body.isDeleted = true;
  } 

  update() {}

}

export default Transmission;
