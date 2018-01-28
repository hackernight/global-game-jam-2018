import Victory from '../prefabs/victory'

class GameOverWin extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //This allows for endless mode, it must go first.
    if(this.game.global.win === true) {
      this.replay()
      return
    }
	this.relationship = this.game.add.audio('relationship');
    this.relationship.loopFull(0.6);

    var victory = new Victory(this.game, 0, 0)


    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'You found love.', {
      font: '42px VT323', fill: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
    });
    text.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
    text.anchor.set(0.5);

    const text2 = this.add.text(this.game.width * 0.5, this.game.height * 0.5 + 44, 'Click to continue your search (endless mode)!', {
      font: '20px VT323', fill: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
    });
    text2.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
    text2.anchor.set(0.5);

    const text3 = this.add.text(this.game.width * 0.5, this.game.height * 0.5 + 68, 'Or quit and press \'R\' to go to the start', {
      font: '20px VT323', fill: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
    });
    text3.setShadow(5, 5, 'rgba(255,255,255,0.5)', 15);
    text3.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    this.game.input.keyboard.addKey(Phaser.Keyboard.R, Phaser.Keyboard).onDown.add(this.restartGame, this);
    this.input.onDown.add(this.continue, this);
  }

  saveVarsToLocalStorage() {

  }

  resetGlobalVariables() {
    var levels = this.game.cache.getJSON('levels')
    this.game.global = {
        dev_mode: this.game.global.dev_mode,
        currentLevel: 1,
        level: levels[0],
        win: false,
        numResets: 3
    };
  }

  continue() {
    this.replay()
  }

  update() {}

  restartGame() {
	this.relationship.stop();
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

  replay(){
    this.game.global.win = true;
	  this.relationship.stop();
    this.game.global.currentLevel = 5;
    this.game.global.level = this.game.cache.getJSON('levels')[4];
    this.game.state.start('game')
  }

}

export default GameOverWin;
