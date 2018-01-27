import Satellite from '../prefabs/satellite'
import Transmission from '../prefabs/transmission'

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
    this.physics.p2.defaultRestitution = 0.8;
    
    this.startSatellite = new Satellite(this.game, 50, 500, false);
    this.targetSatellite = new Satellite(this.game, 5, 5, true);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN, Phaser.Keyboard).onDown.add(this.fireTransmission, this);


    this.input.onDown.add(this.endGame, this);
    
  }



    fireTransmission() {
        let transmission = new Transmission(this.game, this.startSatellite.x, this.startSatellite.y)
        transmission.body.damping= 0;
        transmission.body.mass= 0.1;
        transmission.body.angle = this.physics.arcade.angleToPointer(transmission) * 180 / Math.PI + 90;

        transmission.body.thrust(40000);
    }



 update() {
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
    this.game.state.start('gameover');
  }

}

export default Game;
