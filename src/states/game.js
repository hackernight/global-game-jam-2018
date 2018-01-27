import Satellite from '../prefabs/satellite'
import Transmission from '../prefabs/transmission'
import Star from '../prefabs/star'
import Crate from '../prefabs/crate'
import Speaker from '../prefabs/speaker'
import Rock from '../prefabs/rock'


var twinkleStars = [];
var transmissions = [];
var deadTransmissions = [];
var spaceDebris  =[];

class Game extends Phaser.State {

  constructor() {
    super();
  }


  create() {

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.physics.p2.restitution = 0.8;

    //stuff for the background
    this.makeStars()
    this.makeDebris()

    this.displayLevelName();

    if (this.game.global.numResets> 0){
      const text = this.add.text(100, 50, this.game.global.numResets + " broken hearts", {
        font: '24px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
    }

    // create some collision groups
    this.transmissionCollisionGroup = this.physics.p2.createCollisionGroup();
    this.satelliteCollisionGroup = this.physics.p2.createCollisionGroup();
    this.physics.p2.updateBoundsCollisionGroup();

    this.startSatellite = new Satellite(this.game, 50, 500, false);
    this.startSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);
    this.targetSatellite = new Satellite(this.game, 1300, 100, true);
    this.targetSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);
    this.targetSatellite.body.collides(this.transmissionCollisionGroup);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN, Phaser.Keyboard).onDown.add(this.fireTransmission, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR, Phaser.Keyboard).onDown.add(this.rerollLevel, this);

    this.levelMusic = this.game.add.audio(this.game.global.level.levelMusic)
    this.levelMusic.loopFull(0.6)

    this.input.onDown.add(this.endGame, this);

  }

    fireTransmission() {
      this.startSatellite.speaker.pulse();

        let transmission = new Transmission(this.game, this.startSatellite.x, this.startSatellite.y)

        transmission.body.setCollisionGroup(this.transmissionCollisionGroup);
        transmission.body.damping= 0;
        transmission.body.mass= 0.1;
        transmission.body.angle = this.physics.arcade.angleToPointer(transmission) * 180 / Math.PI + 90;
        transmission.angle = transmission.body.angle + 90;
        transmission.body.collides(this.satelliteCollisionGroup, this.hitSatellite, this);

        transmission.body.thrust(4000);

        transmissions.push(transmission);
    }

    hitSatellite(body1, body2) {
      //  body1 is the transmission
      body1.isDeleted = true;
      //  body2 is the thing it bumped in to
      this.endGame();
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

makeDebris(){
  let numDebris = this.game.rnd.integerInRange(this.game.global.level.minCrates, this.game.global.level.maxCrates)
  for (let i = 0;i<numDebris;i++){
      let newCrate = new Crate(this.game, this.game.rnd.integerInRange(0, 1600), this.game.rnd.integerInRange(0, 768))
      newCrate.angle = this.game.rnd.integerInRange(-180, 180)
      spaceDebris.push(newCrate)
  }
  numDebris = this.game.rnd.integerInRange(this.game.global.level.minRocks, this.game.global.level.maxRocks)
  for (let i = 0;i<numDebris;i++){
      let newRock = new Rock(this.game, this.game.rnd.integerInRange(0, 1600), this.game.rnd.integerInRange(0, 768))
      newRock.angle = this.game.rnd.integerInRange(-180, 180)
      spaceDebris.push(newRock)
  }

}


 update() {
   for (var ts of twinkleStars) {
     ts.checkTwinkle();
   }

   for (var tx of transmissions){

    let angle = Math.atan2(tx.body.velocity.y, tx.body.velocity.x );

    angle = angle * (180/Math.PI);
    tx.body.angle = angle;

     if (tx.body.isDeleted==true) {
      tx.bringOutYerDead();
      deadTransmissions.push(transmissions.indexOf(tx));
     }
   }
   for (var dtx of deadTransmissions){
     transmissions.splice(dtx, 1);

   }
   deadTransmissions = [];

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
      //console.log("angleToPointer: " + (this.physics.arcade.angleToPointer(this.startSatellite) *  180 / Math.PI))
    }

    displayLevelName(){
      const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, this.game.global.level.name, {
        font: '42px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);

      this.game.time.events.add(2000, function() {
            //header.bg.remove()
            this.game.add.tween(text).to({x: this.game.width}, 2000, Phaser.Easing.Linear.None, true);
            this.game.add.tween(text).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
          }, this);
      this.game.time.events.add(4000, function() {
        text.destroy()
      })
    }

    rerollLevel(){
      console.log("rerolling level");
      this.game.global.currentLevel = this.game.global.currentLevel - 1;
      this.game.global.numResets = this.game.global.numResets + 1;

      this.levelMusic.stop();
      twinkleStars = [];
      this.resetGlobalVariables();
      transmissions = [];
      this.game.state.start('giveuponlove');
    }

    resetGlobalVariables(){
      var currentLevel = this.game.global.currentLevel + 1;
      var levels = this.game.cache.getJSON('levels');
      var nextLevel = null;
      for(var level of levels){
        if (level && level.id === currentLevel){
          nextLevel = level;
        }
      }
      this.game.global = {
        dev_mode: true,
        currentLevel:currentLevel,
        level: nextLevel,
        numResets: this.game.global.numResets
      }
    }


  endGame() {
    this.levelMusic.stop();
    twinkleStars = [];
    this.resetGlobalVariables();
    transmissions = [];
    this.game.state.start('leveltransition');
  }

}

export default Game;
