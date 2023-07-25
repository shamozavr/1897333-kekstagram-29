import {isEscapeKey, uploadError, formatError, uploadSuccess, } from './utils.js';
import { initValidation, validatePristine} from './validation.js';
import { scaleReset } from './scale.js';
import { resetSlider, resetFilter} from './effects.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

const imgPreview = form.querySelector('.img-upload__preview img');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
  scaleReset();
  resetSlider();
  resetFilter();
};

const setUploadFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (validatePristine) {
      const formData = new FormData(evt.target);

      fetch(
        'https://29.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then((response) => {
        if (response.ok) {
          onSuccess();
          uploadSuccess();
        } else {
          throw new Error;
        }
      }).catch(uploadError);
    }
  });
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
  uploadFile.addEventListener('click', showmodal);
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (!matches) {
      formatError();
    }
    imgPreview.src = URL.createObjectURL(file);
  });
  // form.addEventListener('submit', onUploadFormSubmit);
  cancelButton.addEventListener('click', hidemodal);
};


export {initUploadForm, setUploadFormSubmit, hidemodal};
