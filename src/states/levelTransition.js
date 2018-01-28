class LevelTransition extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Message Received!', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    setTimeout(function(game) {
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
