import { shuffleArray } from './utils.js';

const filterDefaultButton = document.querySelector('.img-filters__form').querySelector('#filter-default');
const filterRandomButton = document.querySelector('.img-filters__form').querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('.img-filters__form').querySelector('#filter-discussed');

const pictureBlock = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

const RANDOM_PICTURE_COUNT = 10;

let activeButton = document.querySelector('.img-filters__button--active');

const filterDefault = (arrayToSort) => {
  activeButton.classList.remove('img-filters__button--active');
  filterDefaultButton.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  arrayToSort.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
};

// filterDefaultButton.addEventListener('click', debounce(() => {
//   activeButton.classList.remove('img-filters__button--active');
//   filterDefaultButton.classList.add('img-filters__button--active');
//   activeButton = document.querySelector('.img-filters__button--active');

//   picturesArray.forEach((el) => {
//     picturesFragment.append(el);
//   });

//   pictureBlock.append(picturesFragment);
// }));

const filterRandom = (arrayToSort) => {
  activeButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  const picturesArrayClone = [...arrayToSort];

  for(let i = 0; i < arrayToSort.length; i++) {
    arrayToSort[i].remove();
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
};

// filterRandomButton.addEventListener('click', debounce(() => {
//   activeButton.classList.remove('img-filters__button--active');
//   filterRandomButton.classList.add('img-filters__button--active');
//   activeButton = document.querySelector('.img-filters__button--active');

//   const picturesArrayClone = [...picturesArray];

//   for(let i = 0; i < picturesArray.length; i++) {
//     picturesArray[i].remove();
//   }

//   const ids = [];
//   for(let i = 0; i < picturesArrayClone.length; i++) {
//     ids.push(i);
//   }

//   const shuffledIds = shuffleArray(ids);

//   const shuffledArray = [];
//   for(let i = 0; i < RANDOM_PICTURE_COUNT; i++) {
//     const index = shuffledIds[i];
//     shuffledArray.push(picturesArrayClone[index]);
//   }

//   shuffledArray.forEach((el) => {
//     picturesFragment.append(el);
//   });

//   pictureBlock.append(picturesFragment);
// }));

const filterDiscussed = (arrayToSort) => {
  activeButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.add('img-filters__button--active');
  activeButton = document.querySelector('.img-filters__button--active');

  const picturesArrayClone = [...arrayToSort];

  for(let i = 0; i < arrayToSort.length; i++) {
    arrayToSort[i].remove();
  }

  picturesArrayClone.sort((a,b) => b.querySelector('.picture__comments').textContent - a.querySelector('.picture__comments').textContent);

  picturesArrayClone.forEach((el) => {
    picturesFragment.append(el);
  });

  pictureBlock.append(picturesFragment);
};

// filterDiscussedButton.addEventListener('click', debounce(() => {
//   activeButton.classList.remove('img-filters__button--active');
//   filterDiscussedButton.classList.add('img-filters__button--active');
//   activeButton = document.querySelector('.img-filters__button--active');

//   const picturesArrayClone = [...picturesArray];

//   for(let i = 0; i < picturesArray.length; i++) {
//     picturesArray[i].remove();
//   }

//   picturesArrayClone.sort((a,b) => b.querySelector('.picture__comments').textContent - a.querySelector('.picture__comments').textContent);

//   picturesArrayClone.forEach((el) => {
//     picturesFragment.append(el);
//   });

//   pictureBlock.append(picturesFragment);
// }));

export { filterDefaultButton, filterRandomButton, filterDiscussedButton, filterDefault, filterRandom, filterDiscussed };
