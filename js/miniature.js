import { openBigPicture } from './big-picture.js';

const pictureList = document.querySelector('.pictures');
const newPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const PicturesFragment = document.createDocumentFragment();

const addMiniatureFN = (array) => {
  array.forEach(({url, description, likes, comments}) => {
    const picture = newPictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picture.addEventListener('click', () => {
      openBigPicture({url, description, likes, comments});
    });

    PicturesFragment.append(picture);
  });
  pictureList.append(PicturesFragment);
};

export {addMiniatureFN};
