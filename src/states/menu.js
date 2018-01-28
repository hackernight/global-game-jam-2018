

import TitleGraphic from '../prefabs/titleGraphic'

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    let title = new TitleGraphic(this.game,'splash-header')
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.75, 'Mouse to aim and send a message!', {
      font: '18px Arial', fill: '#3d86a5', stroke: '#000000', strokeThickness: 6 , align: 'center'
    });
    text.anchor.set(0.5);
    text.alpha = 0.1;
    var tween = this.game.add.tween(text).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
    tween.yoyo(true, 750);
    const text2 = this.add.text(this.game.width * 0.5, this.game.height * 0.75 + 20, 'Space to give up...', {
      font: '18px Arial', fill: '#3d86a5', stroke: '#000000', strokeThickness: 6 , align: 'center'
    });
    text2.anchor.set(0.5);
    text2.alpha = 0.1;
    var tween2 = this.game.add.tween(text2).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
    tween2.yoyo(true, 750);

    this.input.onDown.add(this.startGame, this);

    this.levelMusic = this.game.add.audio('bleepBloops')
    this.levelMusic.loopFull(0.6)
  }

  update() {}

  startGame () {
    this.levelMusic.stop();
    this.initGlobalVariables();
    this.game.state.start('game');
  }

  initGlobalVariables(){
    var levels = this.game.cache.getJSON('levels')

    this.game.global = {
        dev_mode: true,
        currentLevel: 1,
        level: levels[0],
        win: false,
        numResets: 3
    };
  }

}

export default Menu;
