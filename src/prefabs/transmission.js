class Transmission extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'radio-wave')

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)
    this.body.isDeleted = false;
    

  }

  bringOutYerDead(){
    if (this.body && this.body.isDeleted==true){
      this.destroy();
    }
  }

  update() {}

}

export default Transmission;
