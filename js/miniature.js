import {createPostsArray} from './data.js';
import {PostsQuantity} from './data.js';

const pictureList = document.querySelector('.pictures');
const newPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const postsArray = createPostsArray(PostsQuantity);

for (let i = 0; i < postsArray.length; i++) {
  const picture = newPictureTemplate.cloneNode(true);

  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImg.src = postsArray[i].url;
  pictureImg.alt = postsArray[i].description;
  pictureLikes.textContent = postsArray[i].likes;
  pictureComments.textContent = postsArray[i].comments.length - 1;

  pictureList.appendChild(picture);
}
