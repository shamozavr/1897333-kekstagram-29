import { openBigPicture } from './big-picture.js';
// import { filterDefaultButton, filterRandomButton, filterDiscussedButton, filterDefault, filterRandom, filterDiscussed } from './filters.js';

// const pictureList = document.querySelector('.pictures');
const newPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const PicturesFragment = document.createDocumentFragment();

const addMiniatureFN = (array) => {
  const postsList = [];
  array.forEach(({url, description, likes, comments}) => {
    const picture = newPictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picture.addEventListener('click', () => {
      openBigPicture({url, description, likes, comments});
    });
    postsList.push(picture);
    // PicturesFragment.append(picture);
  });
  return postsList;

  // const picturesArray = Array.from(document.querySelector('.pictures').querySelectorAll('a.picture'));
  // filterDefaultButton.addEventListener('click', filterDefault(picturesArray));
  // filterRandomButton.addEventListener('click', filterRandom(picturesArray));
  // filterDiscussedButton.addEventListener('click', filterDiscussed(picturesArray));
};

export { addMiniatureFN };
