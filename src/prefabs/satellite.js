import Speaker from '../prefabs/speaker'

class Satellite extends Phaser.Sprite {

  constructor(game, x, y, isStart) {
    super(game, x, y, 'start-satellite')
    this.isTargetSatellite = isStart;
    if (this.isTargetSatellite==false) {
      this.tint = 0x00aaff
      this.speaker = new Speaker(this.game, -15, -5);
      this.addChild(this.speaker);
}
    this.isStart = isStart;

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this);
    this.enableBody=true;
    this.physicsBodyType = Phaser.Physics.P2JS;
    this.body.kinematic = true;
    this.body.setRectangle(40,40);
  }

  update() {
    if (this.isTargetSatellite==true) {
      this.body.angle = Math.sin(this.game.time.time * 1/500) * 5
    }

  }

}

export default Satellite;
