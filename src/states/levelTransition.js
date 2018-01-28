class LevelTransition extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Message Received!', {
      font: '42px VT323', fill: '#ffc228', align: 'center'
    });
    text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    setTimeout(function(game) {
     game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR, Phaser.Keyboard).onDown.add(game.restartGame, game);
     game.input.onDown.add(game.restartGame, game);
   }, 2500, this)

  }

  saveVarsToLocalStorage() {

  }

  resetGlobalVariables() {

  }

  update() {}

  restartGame() {
    this.resetGlobalVariables();
    if(this.game.global.level === null){
      this.game.state.start('gameover_win')
      return;
    }
    this.game.state.start('game');
  }

}

export default LevelTransition;
