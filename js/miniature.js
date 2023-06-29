import {createPost} from './data.js';

const pictureList = document.querySelector('.pictures');
const newPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const picture = newPictureTemplate.cloneNode(true);
const pictureImg = picture.querySelector('.picture__img');
const pictureLikes = picture.querySelector('.picture__likes');
const pictureComments = picture.querySelector('.picture__comments');
pictureImg.src = createPost().url;
pictureImg.alt = createPost().description;
pictureLikes.textContent = createPost().likes;
pictureComments.textContent = createPost().comments.length - 1;

pictureList.appendChild(picture);
