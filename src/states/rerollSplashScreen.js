class rerollSplashScreen extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var messages = ["Love can be hard.", "", "Click to try again."]
    if (this.game.global.numResets==1){
      messages = ["Hang in there.", "", "There are plenty of satellites in space."]
    }
    if (this.game.global.numResets==0){
      messages = ["Maybe this is hopeless...","", "I'll give it one more try"]
    }

    for(var i=0; i < messages.length; i++) {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5 + (i * 44), messages[i], {
        font: '42px VT323', fill: '#e36bff', stroke: '#000000', strokeThickness: 6 , align: 'center'
      });
      text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
      text.anchor.set(0.5)
    }

    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR, Phaser.Keyboard).onDown.add(this.startGame, this);
    this.input.onDown.add(this.startGame, this);
    var sigh = this.game.add.audio('sigh');
    setTimeout(function(sigh){sigh.play()}, 250, sigh);
  }

  update() {}

    startGame () {
      //this.levelMusic.stop();
      this.game.state.start('game');
    }

}

export default rerollSplashScreen;
