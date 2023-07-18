import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture'); // блок с полноразмерным изображением
const bigPictureImgBlock = bigPicture.querySelector('.big-picture__img'); //изображение блока bigPicture
const bigPictureImg = bigPictureImgBlock.querySelector('img'); //изображение блока bigPicture
const bigPictureLikes = bigPicture.querySelector('.likes-count'); //Количество лайков likes
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия модалки

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;

const commentsList = document.querySelector('.social__comments');//Список комментариев <ul>
const newCommentTemplate = document.querySelector('.social__comment');//шаблон комментария для наполнения
const CommentsFragment = document.createDocumentFragment();//Фрагмент для наполнения и дальнейше вставки

const commentsLoader = document.querySelector('.comments-loader'); //кнопка загрузки комментариев

const bigPictureCommentsCount = bigPicture.querySelector('.comments-count'); //Общее количество комментариев comments
const SocialCommentsCount = document.querySelector('.social__comment-count'); //Показанное количество комментариев comments

const renderComments = (arrayOfComments) => {//arrayOfComments, каждый объект которого имеет ключи с именами avatar, message, name
  commentsList.innerHTML = '';

  arrayOfComments.forEach(({avatar, message, name}) => {//при помощи деструктуризации передаем их в качетсве аргументов в forEach
    const comment = newCommentTemplate.cloneNode(true);//Копируем шаблон для наполнения на каждой итерации forEach
    const commentImg = comment.querySelector('img');//находим аватарку комментатора

    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = '35';
    commentImg.height = '35';

    comment.querySelector('.social__text').textContent = message;
    CommentsFragment.append(comment);//запихиваем каждый шаблон в фрагмент на каждой итерации
  });
  commentsList.append(CommentsFragment);//запихиваем фрагмент с собранными шаблонами в список <ul> в верстке
};

const showComments = (comments, slicecount) => {
  const slicedArray = comments.slice(0, slicecount);

  commentsShown += COMMENTS_PER_PORTION;
  return slicedArray;
};

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
  commentsShown = 5;
  bigPicture.classList.remove('hidden');//показать модалку BigPicture, убрав класс hidden
  document.documentElement.classList.add('modal-open');//Добавить класс modal-open на <body>

  renderBigPicture (element);//вызов функции отрисовки BigPicture на основе полученных данных

  //пусть при открытии BigPicture на кнопку закрытия вешается слушатель клика и при нажатии:
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');//скрывает BigPicture добавив класс hidden
    document.documentElement.classList.remove('modal-open');//убирает класс modal-open на <body>
    // commentsShown = 5;
  });
  //пусть при открытом состоянии при ниажатии на ESC окно закрывается
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.documentElement.classList.remove('modal-open');
      // commentsShown = 5;
    }
  });
};

export {openBigPicture};
