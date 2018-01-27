

class Star extends Phaser.Sprite {

  constructor(game, x, y, twinkle) {
    super(game, x, y, 'twinkle-star')

    this.shouldTwinkle = twinkle;
      if (this.shouldTwinkle==true){
        this.animations.add('twinkle-star', [0,1,2], 3, false);
        this.animations.play("twinkle-star");
        //this.animations.play('twinkle-star', 15, true);
      }
    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)


  }

checkTwinkle(){
  if (this.shouldTwinkle &&
      (this.animations.currentAnim.name !="twinkle-star" || this.animations.currentAnim.isPlaying==false) &&
      this.game.rnd.integerInRange(0, 1000) <=1){
      this.animations.play("twinkle-star");
    }
}

  update() {}

}

export default Star;
