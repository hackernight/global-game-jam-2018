import Satellite from './satellite'
import Transmission from './transmission'

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
        transmission.body.rotateRight(1000);
        //transmission.body.rotateRight(0);

        transmission.body.thrust(4000);
    }


  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
