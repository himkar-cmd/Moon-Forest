const character = document.getElementById('character');
const moonFragment = document.getElementById('moon-fragment');
const startButton = document.getElementById('start-game');
const scoreDisplay = document.getElementById('score');
const gameArea = document.querySelector('.game-area');

let score = 0;
let gameInterval;
let fragmentMoveTimeout;
function startGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  moonFragment.style.display = 'block';
  startButton.disabled = true;

  moveMoonFragment();

  gameInterval = setTimeout(endGame, 30000);
}
function moveMoonFragment() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - moonFragment.offsetWidth;
  const maxY = gameAreaRect.height - moonFragment.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  moonFragment.style.left = `${randomX}px`;
  moonFragment.style.top = `${randomY}px`;

  fragmentMoveTimeout = setTimeout(moveMoonFragment, 1000);
}
moonFragment.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  clearTimeout(fragmentMoveTimeout); 
  moveMoonFragment(); 
});

function endGame() {
  clearTimeout(fragmentMoveTimeout);
  clearTimeout(gameInterval);
  moonFragment.style.display = 'none';
  startButton.disabled = false;
  alert(`Time's up! Your final score is ${score}.`);
}

startButton.addEventListener('click', startGame);
