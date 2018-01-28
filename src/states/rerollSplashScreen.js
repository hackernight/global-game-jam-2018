class rerollSplashScreen extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const text2 = this.add.text(this.game.width /10, this.game.height * 0.75 + 20, 'Love can be hard. Click to try again', {
      font: '42px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 6 , align: 'center'
    });

    //let title = new TitleGraphic(this.game)

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

    startGame () {
      //this.levelMusic.stop();
      this.game.state.start('game');
    }

}

export default rerollSplashScreen;
