import CenteredSprite from '../prefabs/centeredSprite';

class SplashScreen extends Phaser.State {

    create() {
        const splash = new CenteredSprite(this.game, 'stl');
        splash.alpha = 0;
        const neonate = this.game.add.neonate(splash).to(
            {alpha: 1},
            1500,
            Phaser.Easing.Linear.In,
            true
        ).yoyo(true, 1000);

        neonate.onComplete.add(() => {
            const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'studio');
            logo.anchor.set(0.5);
            logo.scale.set(2);

            logo.animations.add('logo');
            const animation = logo.animations.play('logo', 15, false);

            animation.onComplete.add(() => {
                const style = {
                    font: '42px Arial',
                    fill: '#ffffff',
                    stroke: 0x333333,
                    strokeThickness: 5,
                    align: 'center'
                };
                const text = this.game.add.text(this.game.world.centerX, 100, 'Jokes 2 Far', style);
                text.alpha = 0;
                text.anchor.set(0.5);
                const txtTween = this.game.add.neonate(text).to(
                    {alpha:1},
                    2000,
                    Phaser.Easing.Linear.In,
                    true
                );

                txtTween.onComplete.add(() => {
                    this.game.state.start('menu');
                });

            });
        });
    }

}

export default SplashScreen;