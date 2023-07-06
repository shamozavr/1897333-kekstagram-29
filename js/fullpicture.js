// import {createPostsArray} from './data.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
// const bigPictureSocialComments = document.querySelector('.social__comments');

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.src = thumbnails[i].querySelector('img').src;
    bigPictureLikesCount.textContent = thumbnails[i].querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = thumbnails[i].querySelector('.picture__comments').textContent;
  });
}

bigPictureCloseButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});
