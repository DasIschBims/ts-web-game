import './style.css';
import Canvas from './Canvas';
import Player from './Player/Player';

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
  health: { current: 10, max: 10 },
  movement: { speed: 7.5, friction: .5, step: 5 },
});

player.init();

const loop = () => {
  appCanvas.clear();
  player.update();
  requestAnimationFrame(loop);
};

loop();