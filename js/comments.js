const COMMENTS_PER_PORTION = 5;
let commentsShown = 5;

const SocialCommentsCount = document.querySelector('.social__comment-count'); //Показанное количество комментариев comments

const commentsList = document.querySelector('.social__comments');//Список комментариев <ul>
const newCommentTemplate = document.querySelector('.social__comment');//шаблон комментария для наполнения
const CommentsFragment = document.createDocumentFragment();//Фрагмент для наполнения и дальнейше вставки


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

const showComments = (renderedComments, slicecount) => {
  const slicedArray = renderedComments.slice(0, slicecount);
  SocialCommentsCount.textContent = `${slicecount} из`;

  commentsShown += COMMENTS_PER_PORTION;
};

export {renderComments, showComments, commentsShown};
