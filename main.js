import Game from "./src/js/game/game";

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  const game = new Game(canvas, ctx);
  let lastTime = 0;
  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    if (isNaN(deltaTime)) {
      console.warn(`deltaTime is ${deltaTime}`);
      deltaTime = 0;
    }
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime);
    requestAnimationFrame(animate)
  }
  animate()
})