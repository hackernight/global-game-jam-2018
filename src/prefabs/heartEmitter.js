class HeartEmitter extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    //console.log('going to y', y);
    super(game, x, y)
    this.makeParticles('heartParticle')
    this.setAlpha(0.1, 0.5);
  }

  update() {}

}

export default HeartEmitter
