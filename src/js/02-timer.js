import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDatetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

let futDateMS;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futDateMS = selectedDates[0].getTime();
    const curDateMS = Date.now();
    const timeDiff = futDateMS - curDateMS;

    if (timeDiff <= 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const countingTime = () => {
  const curDateMS = Date.now();
  const ms = futDateMS - curDateMS;
  const objTime = convertMs(ms);
  const keys = Object.keys(objTime);

  for (const key of keys) {
    const selectorName = `.value[data-${key}]`;
    const timeEl = document.querySelector(selectorName);
    timeEl.textContent = addLeadingZero(objTime[key]);
  }
};
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  timerId = setInterval(countingTime, 1000);
});

const fp = flatpickr(inputDatetime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const str = String(value);
  return str.padStart(2, '0');
}
