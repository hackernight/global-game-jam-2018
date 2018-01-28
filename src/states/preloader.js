class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    // setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);
    //HACK BAD HACK TO GET WEB FONTS LOADING
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5 + 40 , "Loading...", {
      font: '24px VT323', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    //images
    this.game.load.image('start-satellite', 'assets/satbase1.png')
    this.game.load.image('radio-wave', 'assets/boopbase1.png')
    this.game.load.image('crate-object', 'assets/cratebase1.png')
    this.game.load.image('chad-nebula', 'assets/markbase1.png')
    this.game.load.image('splash-header', 'assets/splashheader1_scaled.png')
    this.game.load.image('space-rock', 'assets/spacerock48x48.png')
    this.game.load.image('heartParticle', 'assets/lifeheartbase1.png')
    this.game.load.image('give-up', 'assets/giveupsplash1.png')
    this.game.load.image('stl', 'assets/MadeInSTL.png');

    //sprites
    this.game.load.spritesheet('twinkle-star', 'assets/twinkleanim1-sheet.png', 39, 39, 2)
    this.game.load.spritesheet('speaker-pulse', 'assets/speakeranim1.png', 16, 26, 4)
    // this.game.load.spritesheet('black-hole', 'assets/blackhole1_sheet.png', 48, 48, 6)
    this.game.load.spritesheet('black-hole', 'assets/wormhole1_sheet.png', 64, 64, 7)
    this.game.load.spritesheet('victory', 'assets/victorysplashfull1_sheet.png', 1024, 768, 6)
    this.game.load.spritesheet('studio', 'assets/studio-logo-sheet.png', 128, 128);
    this.game.load.spritesheet('give-up-button', 'assets/giveupanim1.png', 52, 66, 4);
    this.game.load.spritesheet('radio-anim','assets/boopanim1-sheet.png', 32, 32, 2);

    //sounds
    this.game.load.audio('level1', ['assets/muzac/bass.wav']);
    this.game.load.audio('level2', ['assets/muzac/bass_drums.wav']);
    this.game.load.audio('level3', ['assets/muzac/bass_drums_melody.wav']);
    this.game.load.audio('level4', ['assets/muzac/bass_drums_melody_harmony.wav']);
    this.game.load.audio('bleepBloops', ['assets/muzac/bleepBloops.wav']);
    this.game.load.audio('thud', ['assets/muzac/thud.wav']);
    this.game.load.audio('bounce', ['assets/muzac/bounce.wav']);
	this.game.load.audio('recieved', ['assets/muzac/message_recieved.wav']);
    this.game.load.audio('fire', ['assets/muzac/send_signal.wav']);
    this.game.load.audio('victory', ['assets/muzac/victory.wav'])
	this.game.load.audio('horn', ['assets/muzac/Bike_Horn.wav'])
    this.game.load.audio('lonely', ['assets/muzac/lonely.wav']);
	this.game.load.audio('relationship', ['assets/muzac/ending.wav']);
    this.game.load.audio('reset', ['assets/muzac/button-depress.wav'])
    this.game.load.audio('sigh', ['assets/muzac/sigh.wav'])

  }

  update() {
    this.game.state.start('splashScreen');
  }

  loadResources() {
    // load your resources here
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
