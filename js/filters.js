import { shuffleArray, debounce, } from './utils.js';
import { pictureArray } from './api.js';

const fitersBlock = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const filterDefault = filterForm.querySelector('#filter-default');
const filterRandom = filterForm.querySelector('#filter-random');
const filterDiscussed = filterForm.querySelector('#filter-discussed');

let activeButton = document.querySelector('.img-filters__button--active');

const pictureBlock = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

filterDefault.addEventListener('click', debounce(() => {
  activeButton.classList.remove('img-filters__button--active');
  filterDefault.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');


  pictureArray.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
}));

filterRandom.addEventListener('click', debounce(() => {
  activeButton.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  const pictureArrayClone = [...pictureArray];
  for(let i = 0; i < pictureArray.length; i++) {
    pictureArray[i].remove();
  }

  const ids = [];
  for(let i = 0; i < pictureArrayClone.length; i++) {
    ids.push(i);
  }

  const shuffledIds = shuffleArray(ids);

  const shuffledArray = [];
  for(let i = 0; i < shuffledIds.length; i++) {
    const index = shuffledIds[i];
    shuffledArray.push(pictureArrayClone[index]);
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

  const pictureArrayClone = [...pictureArray];

  for(let i = 0; i < pictureArray.length; i++) {
    pictureArray[i].remove();
  }

  pictureArrayClone.sort((a,b) => a.querySelector('.picture__comments').textContent - b.querySelector('.picture__comments').textContent);

  pictureArrayClone.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
}));

export {fitersBlock};
