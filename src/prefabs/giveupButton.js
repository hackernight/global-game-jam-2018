

class GiveUpButton extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'give-up-button')

    this.animations.add('button-pulse', [0,1,2,3,2,1], 3, true);
    this.animations.play("button-pulse");
        //this.animations.play('twinkle-star', 15, true);
    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)


  }


  update() {}

}

export default GiveUpButton;
