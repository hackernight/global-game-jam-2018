import TitleGraphic from '../prefabs/titleGraphic'

class giveupOnLove extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'You gave up on love.  In an alternate reality...', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    //let title = new TitleGraphic(this.game)

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default giveupOnLove;
