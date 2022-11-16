import './style.css';
import Canvas from './Canvas';
import Player from './Player/Player';
import HealthBar from './UI/HealthBar';

const app = document.getElementById('app') as HTMLDivElement;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.id = 'canvas';
const appCanvas = new Canvas(canvas);

app.appendChild(appCanvas.canvas);

window.onload = () => {
  appCanvas.resize();
};

window.addEventListener('resize', () => {
  appCanvas.resize();
});

const player = new Player({
  canvas: appCanvas,
  position: { x: 100, y: 100 },
  width: 75,
  height: 75,
  health: { current: 1000, max: 1000 },
  movement: { speed: 15 },
});

const healthBar = new HealthBar({
  canvas: appCanvas,
  width: 200,
  height: 20,
  health: { current: 1000, max: 1000 },
});

player.init();
healthBar.init();

const loop = () => {
  appCanvas.clear();
  player.update();
  healthBar.update();
  healthBar.setHealth({ current: player.getHealth().current, max: player.getHealth().max });
  requestAnimationFrame(loop);
};

loop();