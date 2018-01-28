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

    //images
    this.game.load.image('start-satellite', 'assets/satbase1.png')
    this.game.load.image('radio-wave', 'assets/boopbase1.png')
    this.game.load.image('crate-object', 'assets/cratebase1.png')
    this.game.load.image('chad-nebula', 'assets/markbase1.png')
    this.game.load.image('splash-header', 'assets/splashheader1_scaled.png')
    this.game.load.image('space-rock', 'assets/spacerock48x48.png')
    this.game.load.image('heartParticle', 'assets/lifeheartbase1.png')
    this.game.load.image('give-up', 'assets/giveupsplash1.png')

    //sprites
    this.game.load.spritesheet('twinkle-star', 'assets/twinkleanim1-sheet.png', 39, 39, 2)
    this.game.load.spritesheet('speaker-pulse', 'assets/speakeranim1.png', 16, 26, 4)
    this.game.load.spritesheet('black-hole', 'assets/blackhole1_sheet.png', 48, 48, 6)

    //sounds
    this.game.load.audio('level1', ['assets/muzac/bass.wav']);
    this.game.load.audio('level2', ['assets/muzac/bass_drums.wav']);
    this.game.load.audio('level3', ['assets/muzac/bass_drums_melody.wav']);
    this.game.load.audio('level4', ['assets/muzac/bass_drums_melody_harmony.wav']);
    this.game.load.audio('bleepBloops', ['assets/muzac/bleepBloops.wav']);
    this.game.load.audio('thud', ['assets/muzac/thud.wav']);
    this.game.load.audio('bounce', ['assets/muzac/bounce.wav']);
    this.game.load.audio('fire', ['assets/muzac/send_signal.wav']);
    this.game.load.audio('victory', ['assets/muzac/victory.wav'])


    // setup loading and its events
    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.loadResources();
  }

  update() {
    // if (this.ready) {
    this.game.state.start('menu');
    // }
  }

  loadResources() {
    // load your resources here
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
