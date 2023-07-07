const createCommentFN = (array) => {
  array.array.forEach((element) => {
    const socialCommentsBlock = document.querySelector('.social__comments');
    const socialCommentsElement = socialCommentsBlock.createElement('li');
    socialCommentsBlock.appendChild(socialCommentsElement);
    const socialCommentsImg = socialCommentsElement.createElement('img');
    socialCommentsImg.classList.add('social__picture');
    const socialCommentsText = socialCommentsElement.createElement('p');
    socialCommentsText.classList.add('social__text');

    socialCommentsImg.src = element.avatar;
    socialCommentsImg.alt = element.name;
    socialCommentsImg.width = '35';
    socialCommentsImg.height = '35';
    socialCommentsText.textContent = element.message;
  });

};

export {createCommentFN};
