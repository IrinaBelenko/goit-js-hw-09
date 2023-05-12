import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(formRef.elements.delay.value);
  let amount = Number(formRef.elements.amount.value);
  let step = Number(formRef.elements.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  //e.currentTarget.reset();
}

function createPromise(position, delay) {
  const objResult = {
    position,
    delay,
  };

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve(objResult);
      } else {
        // Reject
        reject(objResult);
      }
    }, delay);
  });

  return promise;
}
