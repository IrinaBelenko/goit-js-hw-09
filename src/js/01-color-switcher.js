const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    console.dir(startBtn);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
