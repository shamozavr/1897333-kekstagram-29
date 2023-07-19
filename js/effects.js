// const sliderContainer = document.querySelector('.img-upload__effect-level');
// const sliderElement = document.querySelector('.effect-level__slider');
// const effectsContainer = document.querySelector('.img-upload__effects');
// const effectValue = document.querySelector('.effect-level__value');
// const allEffects = document.querySelectorAll('.effects__radio');

const modalElement = document.querySelector('.img-upload');
const imageElement = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');

const EFFECTS = {
  none: {
    filter: 'none',
    min: '',
    max: '',
    step: '',
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const chosenEffect = EFFECTS.none;

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider(effect);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const reset = () => {
  setEffect (EFFECTS.none);
};

const createSlider = (effect) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS.effect.min,
      max: EFFECTS.effect.max,
    },
    start: (EFFECTS.effect.max - EFFECTS.effect.min) / 2,
    step: EFFECTS.effect.step,
    connect: 'lower',
  });
};

const setSlider = (effect) => {
  sliderContainer.noUiSlider.destroySlider;
  sliderContainer.classList.add('hidden');

  if (chosenEffect !== EFFECTS.none) {
    createSlider(effect);
    sliderContainer.classList.remove('hidden');
  }
};

onSliderUpdate = () => {
  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
  });
  setImageStyle();
};

const setImageStyle = (element) => {
  document.querySelector(`#effect-${element}`).style.filter = `${EFFECTS.element.filter}(${effectValue.value}${EFFECTS.element.unit})`;
};

onSliderUpdate();
setSlider();


// const effectCheck = (effectsArray, effectsObjects) => {
//   effectsArray.forEach((element) => {
//     element.addEventListener('change', (evt) => {
//       if (evt.target.checked) {
//         sliderElement.noUiSlider.updateOptions({
//           range: {
//             min: effectsObjects.element.filter.min,
//             max: effectsObjects.element.filter.max,
//           },
//           step: effectsObjects.element.step,
//         });

//       }
//     });
//   });
// };

// effectCheck(allEffects, EFFECTS);
