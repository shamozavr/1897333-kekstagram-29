function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const error = errorTemplate.cloneNode(true);

const errorFragment = document.createDocumentFragment();

const serverError = () => {
  error.querySelector('.error__title').textContent = 'Ошибка соединения';
  error.querySelector('.error__button').addEventListener('click', () => {
    window.location.reload();
  });
  error.querySelector('.error__button').textContent = 'Перезагрузить страницу';

  errorFragment.append(error);

  document.documentElement.append(errorFragment);

  setTimeout(() => {
    error.remove();
  }, 5000);
};

const uploadError = () => {
  error.querySelector('.error__button').addEventListener('click', () => {
    error.remove();
  });
  document.documentElement.append(error);
};

const uploadSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const success = successTemplate.cloneNode(true);
  success.querySelector('.success__button').addEventListener('click', () => {
    success.remove();
  });
  document.documentElement.append(success);
};

export {getRandomPositiveInteger, createRandomIdFromRangeGenerator, shuffleArray, isEscapeKey, serverError, uploadError, uploadSuccess};
