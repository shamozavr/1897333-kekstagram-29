import { shuffleArray, debounce } from './utils.js';
import { picturesArray } from './api.js';

const fitersBlock = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const filterDefault = filterForm.querySelector('#filter-default');
const filterRandom = filterForm.querySelector('#filter-random');
const filterDiscussed = filterForm.querySelector('#filter-discussed');

const pictureBlock = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

const RANDOM_PICTURE_COUNT = 10;

let activeButton = document.querySelector('.img-filters__button--active');

filterDefault.addEventListener('click', debounce(() => {
  activeButton.classList.remove('img-filters__button--active');
  filterDefault.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  picturesArray.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
}));

filterRandom.addEventListener('click', debounce(() => {
  activeButton.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  const picturesArrayClone = [...picturesArray];

  for(let i = 0; i < picturesArray.length; i++) {
    picturesArray[i].remove();
  }

  const ids = [];
  for(let i = 0; i < picturesArrayClone.length; i++) {
    ids.push(i);
  }

  const shuffledIds = shuffleArray(ids);

  const shuffledArray = [];
  for(let i = 0; i < RANDOM_PICTURE_COUNT; i++) {
    const index = shuffledIds[i];
    shuffledArray.push(picturesArrayClone[index]);
  }

  shuffledArray.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
}));

filterDiscussed.addEventListener('click', debounce(() => {
  activeButton.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  const picturesArrayClone = [...picturesArray];

  for(let i = 0; i < picturesArray.length; i++) {
    picturesArray[i].remove();
  }

  picturesArrayClone.sort((a,b) => b.querySelector('.picture__comments').textContent - a.querySelector('.picture__comments').textContent);

  picturesArrayClone.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
}));

export {fitersBlock};
