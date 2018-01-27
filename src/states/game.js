import Satellite from '../prefabs/satellite'
import Transmission from '../prefabs/transmission'
import Star from '../prefabs/star'


var twinkleStars = [];

class Game extends Phaser.State {

  constructor() {
    super();
  }


  create() {

    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.physics.p2.restitution = 0.8;
    
    // create some collision groups
    this.transmissionCollisionGroup = this.physics.p2.createCollisionGroup();
    this.satelliteCollisionGroup = this.physics.p2.createCollisionGroup();
    this.physics.p2.updateBoundsCollisionGroup();

    this.startSatellite = new Satellite(this.game, 50, 500, false);
    this.startSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);
    this.targetSatellite = new Satellite(this.game, 450, 400, true);
    this.targetSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);
    this.targetSatellite.body.collides(this.transmissionCollisionGroup);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN, Phaser.Keyboard).onDown.add(this.fireTransmission, this);

    this.makeStars()
    this.input.onDown.add(this.endGame, this);

  }

    fireTransmission() {
        let transmission = new Transmission(this.game, this.startSatellite.x, this.startSatellite.y)
        transmission.body.setCollisionGroup(this.transmissionCollisionGroup)
        transmission.body.damping= 0;
        transmission.body.mass= 0.1;
        transmission.body.angle = this.physics.arcade.angleToPointer(transmission) * 180 / Math.PI + 90;
        transmission.body.collides(this.satelliteCollisionGroup);
        transmission.body.collides(this.satelliteCollisionGroup, this.hitSatellite, this);
      
        transmission.body.thrust(4000);
    }

    hitSatellite(body1, body2) {
      //  body1 is the transmission
      //  body2 is the thing it bumped in to
      body2.sprite.alpha -= 0.25;

    }

makeStars() {

let numStars = this.game.rnd.integerInRange(30, 50)

for (let i = 0;i<numStars;i++){
    let newstar = new Star(this.game, this.game.rnd.integerInRange(0, 1600), this.game.rnd.integerInRange(0, 768), true)
    let scale = this.game.rnd.realInRange(.1, 1)
    newstar.scale.setTo(scale, scale);
    newstar.angle = this.game.rnd.integerInRange(0, 10)
    twinkleStars.push(newstar)
}

//and sprinkle in more tiny stars that don't twinkle, because you couldn't see it anyway
for (let i = 0;i<numStars*2;i++){
    let newstar = new Star(this.game, this.game.rnd.integerInRange(0, 1600), this.game.rnd.integerInRange(0, 768), false)
    let scale = this.game.rnd.realInRange(.01, .25)
    newstar.scale.setTo(scale, scale);
    newstar.angle = this.game.rnd.integerInRange(0, 10)
}


}


 update() {
   for (var ts of twinkleStars) {
     ts.checkTwinkle();
   }

      // //1. angleToPointer makes no assumption over our current angle- th thinks it's always 0
      // //2. so include the current rotation of our sprite in the expression
      // //3. subtract Math.PI/2 as the angle of atan2 (which is sued by angleToPointer) is rotated by 90deg (this is Math.PI/2)

      // //Result: Now we have a delta value that if applied directly to rotation would yield
      // //in a value so that the sprites top center points to the mouse.
      // this.deltaMouseRad = this.startSatellite.rotation - this.physics.arcade.angleToPointer(this.startSatellite) - Math.PI/2;

      // //don't be confused. I want the P of 'Phaser' to point to the mouse so rotate it again by -90deg
      // this.deltaMouseRad = this.deltaMouseRad - Math.PI/2

      // let mod = Math.PI * 2
      // //modulo on float, works in js, means: clamp value to [-Math.PI*2,Math.PI*2]
      // this.deltaMouseRad = this.deltaMouseRad % mod;

      // //lets call it phase shift, angle would jump, lets fix it
      // if (this.deltaMouseRad != this.deltaMouseRad % (mod/2) ) {
      //   this.deltaMouseRad = (this.deltaMouseRad < 0) ? this.deltaMouseRad + mod : this.deltaMouseRad - mod;
      // }

      //this.startSatellite.body.angle = this.physics.arcade.angleToPointer(this.startSatellite) ;
      console.log("angleToPointer: " + (this.physics.arcade.angleToPointer(this.startSatellite) *  180 / Math.PI))
    }

  endGame() {

      twinkleStars = [];
    this.game.state.start('gameover');
  }

}

export default Game;
