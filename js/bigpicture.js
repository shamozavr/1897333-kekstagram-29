// import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture'); // блок с полноразмерным изображением
const bigPictureImgBlock = bigPicture.querySelector('.big-picture__img'); //изображение блока bigPicture
const bigPictureImg = bigPictureImgBlock.querySelector('img'); //изображение блока bigPicture
const bigPictureLikes = bigPicture.querySelector('.likes-count'); //Количество лайков likes
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count'); //Количество комментариев comments
const bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count'); //Количество комментариев comments
const commentsLoader = document.querySelector('.comments-loader'); //кнопка загрузки комментариев
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия модалки

const commentsList = document.querySelector('.social__comments');//Список комментариев <ul>
const newCommentTemplate = document.querySelector('.social__comment');//шаблон комментария для наполнения
const CommentsFragment = document.createDocumentFragment();//Фрагмент для наполнения и дальнейше вставки

//функция отрисовки комментариев которая принимает в себя массив объектов
const renderComments = (arrayOfComments) => {//arrayOfComments, каждый объект которого имеет ключи с именами avatar, message, name
  arrayOfComments.forEach(({avatar, message, name}) => {//при помощи деструктуризации передаем их в качетсве аргументов в forEach
    const comment = newCommentTemplate.cloneNode(true);//Копируем шаблон для наполнения на каждой итерации forEach
    const commentImg = comment.querySelector('img');//находим аватарку комментатора

    commentImg.src = `${avatar}.svg`;
    commentImg.alt = name;
    commentImg.width = '35';
    commentImg.height = '35';

    comment.querySelector('.social__text').textContent = message;
    CommentsFragment.append(comment);//запихиваем каждый шаблон в фрагмент на каждой итерации
  });
  commentsList.append(CommentsFragment);//запихиваем фрагмент с собранными шаблонами в список <ul> в верстке
};

//отрисовка большого изображения, принимает в себя некий объект у которого есть ключи с именами url, likes, comments
const renderBigPicture = ({url, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;

  renderComments (comments);
};

//функция openBigPicture, которая предназанчена для того чтобы:
const openBigPicture = (element) => {
  bigPicture.classList.remove('hidden');//показать модалку BigPicture, убрав класс hidden
  bigPictureSocialCommentsCount.classList.add('hidden');//Скрыть счетчик комментариев, добавив класс hidden
  commentsLoader.classList.add('hidden');//Скрыть кнопку загрузки комментариев, добавив класс hidden
  document.documentElement.classList.add('modal-open');//Добавить класс modal-open на <body>

  renderBigPicture (element);//вызов функции отрисовки BigPicture на основе полученных данных

  //пусть при открытии BigPicture на кнопку закрытия вешается слушатель клика и при нажатии:
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');//скрывает BigPicture добавив класс hidden
    document.documentElement.classList.remove('modal-open');//убирает класс modal-open на <body>
  });
};

// document.addEventListener('keydown', (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     bigPicture.classList.add('hidden');
//     document.documentElement.classList.remove('modal-open');
//   }
// });

export {openBigPicture};
