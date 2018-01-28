import TitleGraphic from '../prefabs/titleGraphic'

class giveupOnLove extends Phaser.State {

  constructor() {
    super();
  }

  create() {
      let title = new TitleGraphic(this.game,'give-up')

    const text2 = this.add.text(this.game.width * 0.5, this.game.height * 0.75 + 20, 'Click to try again from the beginning...', {
      font: '18px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 6 , align: 'center'
    });
    text2.anchor.set(0.5);
    text2.alpha = 0.1;
    var tween2 = this.game.add.tween(text2).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
    tween2.yoyo(true, 750);

    //let title = new TitleGraphic(this.game)

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('boot');
  }

}

export default giveupOnLove;
