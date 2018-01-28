import Satellite from '../prefabs/satellite'
import Transmission from '../prefabs/transmission'
import Star from '../prefabs/star'
import Crate from '../prefabs/crate'
import Speaker from '../prefabs/speaker'
import Rock from '../prefabs/rock'
import BlackHole from '../prefabs/blackHole'
import transmission from '../prefabs/transmission';
import HeartEmitter from '../prefabs/heartEmitter'
import Heart from '../prefabs/heart'
import GiveUpButton from '../prefabs/GiveUpButton'


var twinkleStars = [];
var transmissions = [];
var deadTransmissions = [];
var spaceDebris = [];
var heartEmitter;
var recipientHeartEmitter;
var hearts =[];

class Game extends Phaser.State {

  constructor() {
    super();
  }


  create() {

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.physics.p2.restitution = 0.8;

    // create some collision groups
    this.transmissionCollisionGroup = this.physics.p2.createCollisionGroup();
    this.satelliteCollisionGroup = this.physics.p2.createCollisionGroup();
    this.crateCollisionGroup = this.physics.p2.createCollisionGroup();
    this.rockCollisionGroup = this.physics.p2.createCollisionGroup();
    this.blackHoleCollisionGroup = this.physics.p2.createCollisionGroup();
    this.physics.p2.updateBoundsCollisionGroup();

    this.baseGravitySpeed = 10;
    this.thud = this.game.add.audio('thud');
    this.bounce = this.game.add.audio('bounce');
	this.recieved = this.game.add.audio('recieved');
  this.recieved.volume = 0.2;
    this.fire = this.game.add.audio('fire');
    this.victory = this.game.add.audio('victory');
    this.reset = this.game.add.audio('reset');

    //stuff for the background
    this.makeStars()
    this.makeDebris()
    this.drawHearts()

    this.displayLevelName();

    if (this.game.global.numResets== 0){
      const text = this.add.text(200, 50, "Can't Take Anymore", {
        font: '24px BEON', fill: '#ff5526', align: 'center'
      });
      text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
      text.anchor.set(0.5);

      this.game.time.events.add(2000, function() {
            //header.bg.remove()
            this.game.add.tween(text).to({y: 0}, 2000, Phaser.Easing.Linear.None, true);
            this.game.add.tween(text).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
          }, this);
      this.game.time.events.add(4000, function() {
        text.destroy()
      })

    }



    this.startSatellite = new Satellite(this.game, this.game.width/10, this.game.height/2, false);
    this.startSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);

    let targetX = this.game.width-(this.game.width/10)
    this.targetSatellite = new Satellite(this.game, targetX, this.game.height/10, true);
    this.targetSatellite.body.setCollisionGroup(this.satelliteCollisionGroup);
    this.targetSatellite.body.collides(this.transmissionCollisionGroup);

    heartEmitter = new HeartEmitter(this.game, this.startSatellite.body.x, this.startSatellite.body.y)
    recipientHeartEmitter = new HeartEmitter(this.game, 0, 0)
    this.targetSatellite.addChild(recipientHeartEmitter);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN, Phaser.Keyboard).onDown.add(this.fireTransmission, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.X, Phaser.Keyboard).onDown.add(this.fireTransmission, this);
    this.input.onDown.add(this.fireTransmission, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR, Phaser.Keyboard).onDown.add(this.rerollLevel, this);

    this.levelMusic = this.game.add.audio(this.game.global.level.levelMusic)
    this.levelMusic.loopFull(0.6)

    this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT, Phaser.Keyboard).onDown.add(this.endGame, this);


        this.game.allowedToFire = true;
        this.loadGun()
      }


    loadGun() {
          this.game.allowedToFire = true;
          this.startSatellite.speaker.tint = 0xffffff

      }


  fireTransmission() {
    if (this.game.allowedToFire == true){
      this.game.allowedToFire = false;
      this.game.time.events.add(Phaser.Timer.SECOND, this.loadGun, this);
      this.startSatellite.speaker.tint = 0xf45c42
      this.fire.volume = 0.2;
      this.fire.play();
      this.startSatellite.speaker.pulse();

        heartEmitter.start(true, this.startSatellite.body.y, null, 1)

        let transmission = new Transmission(this.game, this.startSatellite.x, this.startSatellite.y)

        transmission.body.setCollisionGroup(this.transmissionCollisionGroup);
        transmission.body.damping= 0;
        transmission.body.mass= 0.1;
        transmission.body.angle = this.physics.arcade.angleToPointer(transmission) * 180 / Math.PI + 90;
        transmission.angle = transmission.body.angle + 90;
        transmission.body.collides(this.satelliteCollisionGroup, this.hitSatellite, this);
        transmission.body.collides(this.crateCollisionGroup,this.hitCrate,this);
        transmission.body.collides(this.rockCollisionGroup,this.hitRock,this);

        transmission.body.thrust(4000);

        transmissions.push(transmission);
    }
}
    hitSatellite(body1, body2) {
      //  body1 is the transmission
      body1.isDeleted = true;
      recipientHeartEmitter.start(true, 6000, null, 25)
      this.targetSatellite.isTargetSatellite = false; //stop moving
      this.recieved.play();
      //  body2 is the thing it bumped in to

          var timer = this.game.time.create(false)
          timer.add(Phaser.Timer.SECOND * 2, () => {
            this.endGame();
          })

          /*timer.add(Phaser.Timer.SECOND, () => {
            let winMessage
            let splashImage

            this.successSound = this.game.add.audio('success')

            if (this.game.ba.win === false) {
              winMessage = "Nooo... my candy! q.q"
              splashImage = new LoseAnimation(this.game)
              this.message = new HeaderText(this.game, winMessage, 75)
            } else {
              winMessage = "My candy is safe!"
              splashImage = new WinSplash(this.game)
              this.message = new HeaderText(this.game, winMessage, this.game.height - 100)
              this.game.ba.win = true
              this.successSound.play()
            }
            this.gordie.destroy()
            this.assetsToKill.push(splashImage)
          })*/

          timer.start()


    }

    hitCrate(body1,body2){
      //play a sound?
      this.thud.play();
      body1.isDeleted = true;
    }

    hitRock(body1,body2){
      //play a sound?
      this.bounce.play();
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
  let percentile = this.game.width/10;
  let minXCoord = percentile * 3;
  let maxXCoord = this.game.width - (percentile*3)


  let numDebris = this.game.rnd.integerInRange(this.game.global.level.minCrates, this.game.global.level.maxCrates)
  for (let i = 0;i<numDebris;i++){
      let newCrate = new Crate(this.game, this.game.rnd.integerInRange(minXCoord, maxXCoord), this.game.rnd.integerInRange(0, this.game.height))
      newCrate.body.damping= 0;
      newCrate.body.mass= 0.1;
      newCrate.body.setCollisionGroup(this.crateCollisionGroup);
      newCrate.body.collides(this.transmissionCollisionGroup);
      newCrate.body.angle = this.game.rnd.integerInRange(-90, 90);
      spaceDebris.push(newCrate);
  }
  numDebris = this.game.rnd.integerInRange(this.game.global.level.minRocks, this.game.global.level.maxRocks)
  var rockimage = 'space-rock';
  if (this.game.global.level.chadNebula > 0 && this.game.rnd.integerInRange(1,5) ==1){
    rockimage = 'the-chad-nebula';
    const text = this.add.text(this.game.width/4, 100, "Is that Chad Nebula?", {
      font: '24px BEON', fill: '#54ed36', align: 'center'
    });
    text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
    text.anchor.set(0.5);

    this.game.time.events.add(4000, function() {
          //header.bg.remove()
          this.game.add.tween(text).to({y: 0}, 4000, Phaser.Easing.Linear.None, true);
          this.game.add.tween(text).to({alpha: 0}, 4000, Phaser.Easing.Linear.None, true);
        }, this);
    this.game.time.events.add(8000, function() {
      text.destroy()
    })

  }

  for (let i = 0;i<numDebris;i++){
      let newRock = new Rock(this.game, this.game.rnd.integerInRange(minXCoord, maxXCoord), this.game.rnd.integerInRange(0, this.game.height),rockimage)
      newRock.body.damping= 0;
      newRock.body.mass= 0.1;
      newRock.body.setCollisionGroup(this.rockCollisionGroup);
      newRock.body.collides(this.transmissionCollisionGroup);
      newRock.body.angle = this.game.rnd.integerInRange(-90, 90);
      spaceDebris.push(newRock);
  }

  numDebris = this.game.global.level.blackHoles;
  for (let i = 0;i<numDebris;i++){
      let newBH = new BlackHole(this.game, this.game.rnd.integerInRange(minXCoord, maxXCoord), this.game.rnd.integerInRange(0, this.game.height))

      newBH.angle = this.game.rnd.integerInRange(-180, 180)
      newBH.body.damping= 0;
      newBH.body.setCollisionGroup(this.blackHoleCollisionGroup);
      newBH.body.collides(this.transmissionCollisionGroup);
      spaceDebris.push(newBH);
  }

}
drawHearts() {

let startPointX = 20;
let startPointY = 20;

this.giveUpButton = new GiveUpButton(this.game, startPointX, startPointY)
startPointX = startPointX + 60;

for (let i = 0;i<this.game.global.numResets;i++){
    let newHeart = new Heart(this.game, startPointX, startPointY, true)
    hearts.push(newHeart)
    startPointX = startPointX + 20;
}
}


 update() {
   for (var ts of twinkleStars) {
     ts.checkTwinkle();
   }

   for (var tx of transmissions){
     if (!tx.body) {
       continue;
     }
     // reorient the radio wave graphic
    let angle = Math.atan2(tx.body.velocity.y, tx.body.velocity.x );
    angle = angle * (180/Math.PI);
    tx.body.angle = angle;
    // clean up the dead radio waves
     if (tx.body.isDeleted==true) {
      tx.bringOutYerDead();
      deadTransmissions.push(transmissions.indexOf(tx));
     }
   }
   //remove the dead radio waves from the array
   for (var dtx of deadTransmissions){
     transmissions.splice(dtx, 1);

   }
   deadTransmissions = [];

//gravity accelleration
for (var bh of spaceDebris){
  // console.log(bh.type)
  if (bh.type=="blackHole"){
    for( var gtx of transmissions){
      if(gtx.body && bh.body){
        // console.log(bh)
        // console.log("gtx x:" + gtx.body.x)
        // console.log("gtx y:" + gtx.body.y)
        // console.log("gtx mass:" + gtx.body.myMass)
        // console.log("r x:" + bh.body.x)
        // console.log("r y:" + bh.body.y)
        // console.log("r mass:" + bh.body.myMass)
        // console.log("distance:" + this.math.distance(gtx.x,gtx.y,bh.x,bh.y))
        // console.log("accellerationforce:" + gtx.body.myMass * bh.body.myMass / (distance * distance))
        var distance = this.math.distance(gtx.x,gtx.y,bh.x,bh.y);
        var gravAngle = Math.atan2(bh.body.y - gtx.body.y, bh.body.x - gtx.body.x);
        if(distance > 0){
          gtx.body.force.x = gtx.body.force.x + Math.cos(gravAngle) * this.baseGravitySpeed * gtx.body.myMass * bh.body.myMass / (distance * distance);    // accelerateToObject
          gtx.body.force.y = gtx.body.force.y + Math.sin(gravAngle) * this.baseGravitySpeed * gtx.body.myMass * bh.body.myMass / (distance * distance);
        }
      }

    }
  }
}



      //1. angleToPointer makes no assumption over our current angle- th thinks it's always 0
       //2. so include the current rotation of our sprite in the expression
       //3. subtract Math.PI/2 as the angle of atan2 (which is sued by angleToPointer) is rotated by 90deg (this is Math.PI/2)

       //Result: Now we have a delta value that if applied directly to rotation would yield
       //in a value so that the sprites top center points to the mouse.
       let deltaMouseRad = this.startSatellite.rotation - this.game.physics.arcade.angleToPointer(this.startSatellite) - Math.PI/2;

       //don't be confused. I want the P of 'Phaser' to point to the mouse so rotate it again by -90deg
       deltaMouseRad = deltaMouseRad - Math.PI/2

       let mod = Math.PI * 2
       //modulo on float, works in js, means: clamp value to [-Math.PI*2,Math.PI*2]
       deltaMouseRad = deltaMouseRad % mod;

       //lets call it phase shift, angle would jump, lets fix it
       if (deltaMouseRad != deltaMouseRad % (mod/2) ) {
         deltaMouseRad = (deltaMouseRad < 0) ? deltaMouseRad + mod : deltaMouseRad - mod;
       }
       //speed is some factor to get the object faster to the target rotation.
       //remember we are wotking with the angle velocity and let the engine
       //rotate the body
       let speed = 150
       this.startSatellite.body.rotateLeft(speed * deltaMouseRad);

    }

    displayLevelName(){
      const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, this.game.global.level.name, {
        font: '42px VT323', fill: '#5eff96', align: 'center'
      });
      text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
      text.anchor.set(0.5);

      this.game.time.events.add(2000, function() {
            //header.bg.remove()
            this.game.add.tween(text).to({x: this.game.width}, 2000, Phaser.Easing.Linear.None, true);
            this.game.add.tween(text).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
          }, this);
      this.game.time.events.add(4000, function() {
        text.destroy()
      })

      if (this.game.global.endlessModeCount>0){
        const text2 = this.add.text(10, this.game.height * 0.25, this.game.global.endlessModeCount + " connections", {
          font: '42px VT323', fill: '#5eff96', align: 'center'
        });
      }
    }

    rerollLevel(){
      this.reset.play();
      let nextscreen = 'giveuponlove';
      if (this.game.global.numResets > 0){
        if (this.game.global.win == false){
          //don't advance levels if we're in endless mode
          this.game.global.currentLevel = this.game.global.currentLevel - 1;
        }
        this.game.global.numResets = this.game.global.numResets - 1;
        nextscreen = 'rerollSplashScreen';
      }

      this.levelMusic.stop();
      twinkleStars = [];
      this.resetGlobalVariables();
      transmissions = [];
      this.game.state.start(nextscreen);

    }

    resetGlobalVariables(){
      var currentLevel = this.game.global.currentLevel;
      if (this.game.global.win == false){
        //don't advance levels if we're in endless mode
        currentLevel = currentLevel + 1;
      }

      var levels = this.game.cache.getJSON('levels');
      var nextLevel = null;
      for(var level of levels){
        if (level && level.id === currentLevel){
          nextLevel = level;
        }
      }
      this.game.global = {
        dev_mode: this.game.global.dev_mode,
        win: this.game.global.win,
        currentLevel: currentLevel,
        level: nextLevel,
        numResets: this.game.global.numResets,
        endlessModeCount: this.game.global.endlessModeCount
      }
    }


  endGame() {

    if (this.game.global.level.lastLevel ==true ){
      //you beat level 4!  have a bonus for endless mode
      //clamp hearts to 3.
      this.game.global.numResets = Math.min(this.game.global.numResets+1, 3);
    }
    this.levelMusic.stop();
    twinkleStars = [];
    this.resetGlobalVariables();
    transmissions = [];
    this.victory.play();
    this.game.state.start('leveltransition');
  }

}

export default Game;
