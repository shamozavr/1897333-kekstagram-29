import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImgBlock = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgBlock.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 5;

const commentsList = document.querySelector('.social__comments');
const newCommentTemplate = document.querySelector('.social__comment');
const CommentsFragment = document.createDocumentFragment();

const commentsLoader = document.querySelector('.comments-loader');

const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsCount = document.querySelector('.social__comment-count');

const body = document.querySelector('body');

let commentsClone = [];

const renderComments = (arrayOfComments) => {
  commentsList.innerHTML = '';

  arrayOfComments.forEach(({avatar, message, name}) => {
    const comment = newCommentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('img');

    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = '35';
    commentImg.height = '35';

    comment.querySelector('.social__text').textContent = message;
    CommentsFragment.append(comment);
  });
  commentsList.append(CommentsFragment);
};

const showComments = () => {
  renderComments(commentsClone.slice(0, commentsShown));
  socialCommentsCount.textContent = `${Array.from(commentsList.children).length} комментариев из ${bigPictureCommentsCount.textContent}`;
  if (commentsShown >= Number(bigPictureCommentsCount.textContent)) {
    commentsLoader.classList.add('hidden');
  }
  commentsShown += COMMENTS_PER_PORTION;
};

commentsLoader.addEventListener ('click', () => {
  showComments();
});

const renderBigPicture = ({url, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  commentsClone = [...comments];
  socialCommentsCount.textContent = `${Array.from(commentsList.children).length} из ${bigPictureCommentsCount.textContent}`;
};

const ondocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openBigPicture = (element) => {
  commentsShown = 5;
  commentsLoader.classList.remove('hidden');
  renderBigPicture (element);
  showComments();
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureCloseButton.addEventListener('click', () => {
    document.removeEventListener('keydown', ondocumentKeyDown, {once:true});
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }, {once:true});

  document.addEventListener('keydown', ondocumentKeyDown, {once:true});
};

export { openBigPicture, body };
