import { ondocumentKeyDown } from './form.js';

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
///////////////////////////////////////////////////////////////////
function onButtonErrorRemove () {
  document.addEventListener('keydown', ondocumentKeyDown, {once: true});
  error.removeEventListener('click', onAreaErrorRemove, {once: true});
  document.removeEventListener('keydown', onKeyDownErrorRemove, {once: true});

  error.remove();
}

function onAreaErrorRemove (evt) {
  if (evt.target && evt.target !== document.querySelector('.error__inner')) {
    document.addEventListener('keydown', ondocumentKeyDown, {once: true});
    error.querySelector('.error__button').removeEventListener('click', onButtonErrorRemove, {once: true});
    document.removeEventListener('keydown', onKeyDownErrorRemove, {once: true});
    error.remove();
  }
}

function onKeyDownErrorRemove (evt) {
  if (isEscapeKey(evt)) {
    document.addEventListener('keydown', ondocumentKeyDown, {once: true});
    error.querySelector('.error__button').removeEventListener('click', onButtonErrorRemove, {once: true});
    error.removeEventListener('click', onAreaErrorRemove, {once: true});
    error.remove();
  }
}

const uploadError = () => {
  document.removeEventListener('keydown', ondocumentKeyDown, {once: true});

  //Клик по кнопке
  error.querySelector('.error__button').addEventListener('click', onButtonErrorRemove, {once: true});

  //Клик по по области
  error.addEventListener('click', onAreaErrorRemove, {once: true});

  //Нажатие на ESC
  document.addEventListener('keydown', onKeyDownErrorRemove, {once: true});

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

export { shuffleArray, isEscapeKey, serverError, uploadError, formatError, uploadSuccess, debounce };
