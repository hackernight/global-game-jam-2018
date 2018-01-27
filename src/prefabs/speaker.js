class Speaker extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'speaker-pulse')

      this.animations.add('pulse', [0,1,2,3,0,1], 16, false);
      this.animations.play("pulse");
      game.add.existing(this)
  }

  update() {}

pulse(){
  if (this.animations.currentAnim.name !="pulse" || this.animations.currentAnim.isPlaying==false) {
      this.animations.play("pulse");
    }
}

}

export default Speaker;
