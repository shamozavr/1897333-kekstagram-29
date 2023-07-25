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

const formatError = () => {
  error.querySelector('.error__title').textContent = 'Неверный формат изображения';
  error.querySelector('.error__button').addEventListener('click', () => {
    error.remove();
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  });

  errorFragment.append(error);

  document.documentElement.append(errorFragment);

  setTimeout(() => {
    error.remove();
    document.querySelector('.img-upload__overlay').classList.add('hideen');
  }, 5000);
};

const uploadError = () => {
  error.querySelector('.error__button').addEventListener('click', () => {
    error.remove();
  });
  error.addEventListener('click', (evt) => {
    if (evt.target && evt.target !== document.querySelector('.error__inner')) {
      error.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      error.remove();
    }
  });
  document.documentElement.append(error);
};

const uploadSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const success = successTemplate.cloneNode(true);
  success.querySelector('.success__button').addEventListener('click', () => {
    success.remove();
    document.querySelector('.img-upload__preview img').src = 'img/upload-default-image.jpg';
  });
  success.addEventListener('click', (evt) => {
    if (evt.target && evt.target !== document.querySelector('.success__inner')) {
      success.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      success.remove();
    }
  });
  document.documentElement.append(success);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomPositiveInteger, createRandomIdFromRangeGenerator, shuffleArray, isEscapeKey, serverError, uploadError, formatError, uploadSuccess, debounce};
