import Game from "./src/js/game/game";

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  let game;
  let animationId;
  const startupScreen = document.querySelector('.startup-screen');
  const startButton = document.querySelector('.start');
  const highScoreContainer = document.querySelector('.highscore');
  const controlsContainer = document.querySelector('.controls-container');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (startupScreen) {
    startupScreen.classList.add('flex');
    if (!controlsContainer.classList.contains('none')) controlsContainer.classList.add('none')
    canvas.classList.add('none');
    highScoreContainer.innerText = `High Score: ${(JSON.parse(localStorage.getItem('ship-highscore')) === null) ? 0 : JSON.parse(localStorage.getItem('ship-highscore'))}`
  }

  startButton.addEventListener('click', () => {
    startGame();
  })

  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function endGame() {
    if (game) game.calculateHighScore();
    if (startupScreen) {
      if (canvas) canvas.classList.add('none')
      startupScreen.classList.remove('none');
      startupScreen.classList.add('flex');
      if (highScoreContainer) highScoreContainer.innerText = `High Score: ${(JSON.parse(localStorage.getItem('ship-highscore')) === null) ? 0 : JSON.parse(localStorage.getItem('ship-highscore'))}`
      if (!controlsContainer.classList.contains('none')) controlsContainer.classList.add('none')
    }
    if (animationId) cancelAnimationFrame(animationId);
  }
  
  function startGame() {
    console.log('game start')
    console.log();
    if (startupScreen) {
      startupScreen.classList.remove('flex');
      startupScreen.classList.add('none');
      if (canvas) canvas.classList.remove('none');
      if (isMobileDevice()) {
        if (controlsContainer.classList.contains('none')) controlsContainer.classList.remove('none');
      }
    }

    game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp) {
      let deltaTime = timeStamp - lastTime;
      if (isNaN(deltaTime)) {
        console.warn(`deltaTime is ${deltaTime}`);
        deltaTime = 0;
      }
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (game.gameOver) {
        console.log(game.gameOver);
        endGame();
        return;
      }
      game.render(deltaTime);
      animationId = requestAnimationFrame(animate)
    }
    animate()
  }
})