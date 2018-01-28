import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';
import GiveUpOnLove from './states/giveupOnLove';
import LevelTransition from './states/levelTransition';
import SplashScreen from './states/splashScreen';
import RerollSplashScreen from './states/rerollSplashScreen'

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'global-game-jam-2018-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());
game.state.add('giveuponlove', new GiveUpOnLove());
game.state.add('leveltransition', new LevelTransition());
game.state.add('splashScreen', new SplashScreen());
game.state.add('rerollSplashScreen', new RerollSplashScreen());

game.state.start('boot');
