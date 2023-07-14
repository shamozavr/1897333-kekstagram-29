import {isEscapeKey} from './utils.js';
import { renderComments, showComments, commentsShown, commentsList } from './comments.js';

const bigPicture = document.querySelector('.big-picture'); // блок с полноразмерным изображением
const bigPictureImgBlock = bigPicture.querySelector('.big-picture__img'); //изображение блока bigPicture
const bigPictureImg = bigPictureImgBlock.querySelector('img'); //изображение блока bigPicture
const bigPictureLikes = bigPicture.querySelector('.likes-count'); //Количество лайков likes
const commentsLoader = document.querySelector('.comments-loader'); //кнопка загрузки комментариев
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия модалки

const bigPictureCommentsCount = bigPicture.querySelector('.comments-count'); //Общее количество комментариев comments
const SocialCommentsCount = document.querySelector('.social__comment-count'); //Показанное количество комментариев comments

//отрисовка большого изображения, принимает в себя некий объект у которого есть ключи с именами url, likes, comments
const renderBigPicture = ({url, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  renderComments(showComments(comments, commentsShown));
  commentsLoader.addEventListener ('click', () => {
    renderComments(showComments(comments, commentsShown));
    SocialCommentsCount.textContent = `${Array.from(commentsList.children).length} из ${bigPictureCommentsCount.textContent}`;
  });
  SocialCommentsCount.textContent = `${Array.from(commentsList.children).length} из ${bigPictureCommentsCount.textContent}`;
};

//функция openBigPicture, которая предназанчена для того чтобы:
const openBigPicture = (element) => {
  bigPicture.classList.remove('hidden');//показать модалку BigPicture, убрав класс hidden
  document.documentElement.classList.add('modal-open');//Добавить класс modal-open на <body>

  renderBigPicture (element);//вызов функции отрисовки BigPicture на основе полученных данных

  //пусть при открытии BigPicture на кнопку закрытия вешается слушатель клика и при нажатии:
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');//скрывает BigPicture добавив класс hidden
    document.documentElement.classList.remove('modal-open');//убирает класс modal-open на <body>
  });
  //пусть при открытом состоянии при ниажатии на ESC окно закрывается
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.documentElement.classList.remove('modal-open');
    }
  });
};

export {openBigPicture};
