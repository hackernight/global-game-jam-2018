

class Victory extends Phaser.Sprite {

    constructor(game, x, y) {
      super(game, x, y, 'victory')

      this.animations.add('victory', [0,1,2,3,4,5], 6, true);
      this.animations.play("victory");

      game.add.existing(this);
    }



    update() {}

  }

  export default Victory;
