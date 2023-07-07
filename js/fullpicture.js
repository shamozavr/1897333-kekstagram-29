import {isEscapeKey} from './utils.js';
// import {createCommentFN} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const showBigPicture = (pic) => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.documentElement.classList.add('modal-open');

  bigPictureImg.src = pic.querySelector('.picture__img').src;
  bigPictureLikesCount.textContent = pic.querySelector('.picture__likes').textContent;
  bigPictureCommentsCount.textContent = pic.querySelector('.picture__comments').textContent;
};

bigPictureCloseButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.documentElement.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.documentElement.classList.remove('modal-open');
  }
});

export {showBigPicture};

////////////////// функция закрытия не пригодилась как будто
// const closeBigPicture = () => {
//   bigPicture.classList.add('hidden');
//   document.documentElement.classList.remove('modal-open');

//   document.removeEventListener('keydown', (evt) => {
//     if (isEscapeKey(evt)) {
//       evt.preventDefault();
//       bigPicture.classList.add('hidden');
//     }
//   });
// };
////////////////////первоначальный вариант
// for (let i = 0; i < thumbnails.length; i++) {
//   thumbnails[i].addEventListener('click', () => {
//     bigPicture.classList.remove('hidden');
//     socialCommentCount.classList.add('hidden');
//     commentsLoader.classList.add('hidden');
//     body.classList.add('modal-open');

//     bigPictureImg.src = thumbnails[i].querySelector('img').src;
//     bigPictureLikesCount.textContent = thumbnails[i].querySelector('.picture__likes').textContent;
//     bigPictureCommentsCount.textContent = thumbnails[i].querySelector('.picture__comments').textContent;
//   });
// }

