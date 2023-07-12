import {createPostsArray} from './data.js';
import {POSTSQUANTITY} from './data.js';
import {showBigPicture} from './fullpicture.js';

const pictureList = document.querySelector('.pictures');
const newPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const postsArray = createPostsArray(POSTSQUANTITY);
const PicturesFragment = document.createDocumentFragment();

const addMiniatureFN = (array) => {
  array.forEach(({url, description, likes, comments}) => {
    const picture = newPictureTemplate.cloneNode(true);

    picture.addEventListener('click', () => {
      showBigPicture({url, description, likes, comments});
    });

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    PicturesFragment.append(picture);
  });
  pictureList.append(PicturesFragment);
};

export {addMiniatureFN};
export {postsArray};

// for (let i = 0; i < postsArray.length; i++) {
//   const picture = newPictureTemplate.cloneNode(true);

//   const pictureImg = picture.querySelector('.picture__img');
//   const pictureLikes = picture.querySelector('.picture__likes');
//   const pictureComments = picture.querySelector('.picture__comments');

//   pictureImg.src = postsArray[i].url;
//   pictureImg.alt = postsArray[i].description;
//   pictureLikes.textContent = postsArray[i].likes;
//   pictureComments.textContent = postsArray[i].comments.length - 1;

//   PicturesFragment.appendChild(picture);
// }

// pictureList.appendChild(PicturesFragment);


/* const container = document.querySelector('.pictures');
const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createThumbnail = ({ comments, description, likes, url }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture_img').src = url;
  thumbnail.querySelector('.picture_img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
*/
