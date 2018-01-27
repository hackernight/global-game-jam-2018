class Satellite extends Phaser.Sprite {

  constructor(game, x, y, isStart) {
    super(game, x, y, 'start-satellite')
    if (isStart) {
      this.tint = 0x00aaff
}
    this.isStart = isStart;

    //game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this)

  }

  update() {}

}

export default Satellite;
