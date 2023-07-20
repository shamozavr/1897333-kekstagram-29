const imageElement = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');

const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    unit: ''
  }
};

let chosenEffect = EFFECTS.none;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

hideSlider();

noUiSlider.create(sliderElement, {
  range: {
    min: chosenEffect.min,
    max: chosenEffect.max,
  },
  start: chosenEffect.max,
  step: chosenEffect.step,
  connect: 'lower',
});

const setImageStyle = () => {
  imageElement.style.filter = `${chosenEffect.filter}(${effectValue.value}${chosenEffect.unit})`;
};

effectsContainer.addEventListener('click', (evt) => {
  if (evt.target.value && evt.target.value !== 'none') {
    showSlider();
    chosenEffect = EFFECTS[evt.target.value];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max,
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });
  }
  if (evt.target.value === 'none') {
    hideSlider();
  }
  setImageStyle();
});

sliderElement.noUiSlider.on('update', () => {
  effectValue.value = sliderElement.noUiSlider.get();
  setImageStyle();
});
