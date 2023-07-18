import {isEscapeKey} from './utils.js';
import { initValidation, validatePristine} from './validation.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

const hashTagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

//Открывает форму загрузки изображения
const showmodal = () => {
  overlay.classList.remove('hidden');
  document.documentElement.classList.add('modal-open');
  document.addEventListener('keydown', ondocumentKeyDown);
};

//Закрывает форму загрузки изображения
const hidemodal = () => {
  form.reset();
  overlay.classList.add('hidden');
  document.documentElement.classList.remove('modal-open');
  document.removeEventListener('keydown', ondocumentKeyDown);
};

const onUploadFormSubmit = (evt) => {
  if (!validatePristine()) {
    evt.preventDefault();
  }
};

const isTextFieldFocused = () => document.activeElement === hashTagField || document.activeElement === commentField;

function ondocumentKeyDown (evt) {//декларативно потому что используется до объявления
  if (isEscapeKey(evt) && evt !== isTextFieldFocused) {//Исключает поля ввода комментов и хэштегов при нажатии esc
    evt.preventDefault();
    hidemodal();
  }
}

const initUploadForm = () => {
  initValidation();
  uploadFile.addEventListener('change', showmodal);
  form.addEventListener('submit', onUploadFormSubmit);
  cancelButton.addEventListener('click', hidemodal);
};

export {initUploadForm};
