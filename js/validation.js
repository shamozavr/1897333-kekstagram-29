const HASHTAG_MAX_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,20}$/i;

const CHECK_HASHTAGS_VALIDITY = 'Используйте валидный хэштег из букв/чисел, без пробелов/спецсимволов, и не более 20 знаков длиной.';
const CHECK_HASHTAGS_COUNT = 'Нельзя указать более пяти хэштегов.';
const CHECK_DOUBLE_HASHTAGS = 'Один и тот же хэштег не может быть использован дважды.';

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const cleanHashtags = (string) => string.toLowerCase().trim().split(' ');

const isHashtagsValid = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = cleanHashtags(value);
  return hashtags.every((element) => HASHTAG_REGEXP.test(element));
};

const checkHashtagsCount = (value) => cleanHashtags(value).length <= HASHTAG_MAX_COUNT;

const checkHashtagsRepeat = (value) => Array.from(cleanHashtags(value)).length === [...new Set(cleanHashtags(value))].length;

const validatePristine = () => pristine.validate(); //Использует метод библиотеки validate()

//Вывод валидатора (исп. 5 параметров: поле, колбэк проверки, текст ошибки, приоритет, прерывание)
const initValidation = () => {
  pristine.addValidator(textHashtags, isHashtagsValid, CHECK_HASHTAGS_VALIDITY, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsCount, CHECK_HASHTAGS_COUNT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagsRepeat, CHECK_DOUBLE_HASHTAGS, 1, true);
};

export { initValidation, validatePristine };

