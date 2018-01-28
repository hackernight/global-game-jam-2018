import Speaker from '../prefabs/speaker'

class Satellite extends Phaser.Sprite {

  constructor(game, x, y, isStart) {
    super(game, x, y, 'start-satellite')
    this.isTargetSatellite = isStart;
    if (this.isTargetSatellite==false) {
      this.tint = 0x00aaff
      this.speaker = new Speaker(this.game, -15, -5);
      this.addChild(this.speaker);
} else {

    this.tick = this.game.time.now;
}
    this.travelingUp = false;
    this.isStart = isStart;

    game.physics.enable(this, Phaser.Physics.P2JS);
    game.add.existing(this);
    this.enableBody=true;
    this.physicsBodyType = Phaser.Physics.P2JS;
    this.body.kinematic = true;
    this.body.setRectangle(40,40);
  }


  moveTargetSatellite(){

          let changedDirection = false;
          this.body.angle = Math.sin(this.game.time.time * 1/500) * 5

          if (this.body.y <= this.game.height/10 && this.travelingUp==true){
            //reverse direction, go down
            this.travelingUp = false;
            changedDirection = true;
          }
          if (this.body.y >= this.game.height-(this.game.height/10) && this.travelingUp==false){
            //reverse direction, go up
            this.travelingUp = true;
            changedDirection = true;
          }

          //add some perversity
          /*if ( changedDirection == false){
            let perversity = this.game.rnd.integerInRange(0, 1000);
            if (perversity <= 1){
              this.body.y += -4;
            }
            if (perversity == 2){
              this.body.y += 4;
            }
          }*/

          if (this.travelingUp ==true){
            this.body.y += -1;
          }else {
            this.body.y += 1;

          }

  }

  update() {
    if (this.isTargetSatellite==true && this.game.time.now - this.tick > 10) {
      this.moveTargetSatellite();
      this.tick = this.game.time.now;
    }

  }
}

export default Satellite;
