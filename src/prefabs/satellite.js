import Speaker from '../prefabs/speaker'

class Satellite extends Phaser.Sprite {

  constructor(game, x, y, isStart) {
    super(game, x, y, 'start-satellite')
    if (isStart==false) {
      this.tint = 0x00aaff
      this.speaker = new Speaker(this.game, x+15, y-10);
}
    this.isStart = isStart;

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this);
    this.enableBody=true;
    this.physicsBodyType = Phaser.Physics.P2JS;
    this.body.kinematic = true;
    this.body.setRectangle(40,40);
  }

  update() {}

}

export default Satellite;
