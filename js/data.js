import {getRandomPositiveInteger} from './utils.js';
import {createRandomIdFromRangeGenerator} from './utils.js';

const NAMES = [
  'Александр',
  'Алексей',
  'Владимир',
  'Вячеслав',
  'Геннадий',
  'Дмитрий',
  'Иван',
  'Константин',
  'Леонид',
  'Михаил',
  'Николай',
  'Анастасия',
  'Валентина',
  'Диана',
  'Елена',
  'Жанна',
  'Ксения',
  'Лана',
  'Марина',
  'Ольга',
  'Светлана'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Речка',
  'Тусовка',
  'Resident Evil 4 (2023)',
  '#Заруба',
  'Чаевничаем',
  'Дорога дорога',
  'Карты деньги два кота',
  'Vladimir the poker',
  'Джонни Д'
];

const PostsQuantity = 25;
const randomCommentID = createRandomIdFromRangeGenerator(1, PostsQuantity);
const randomPostID = createRandomIdFromRangeGenerator(1, PostsQuantity);

const createComment = () =>
  ({
    id: randomCommentID(), //любое число. Идентификаторы не должны повторяться.
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}`, //это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
    message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)], //вам необходимо взять одно или два случайных предложения из представленных
    name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)] // берем из массива имен
  });

const createCommentsArray = (number) => {
  const COMMENTS = [];
  for (let i = 0; i < number; i++) {
    COMMENTS.push(createComment());
  }
  return COMMENTS;
};

const createPost = () => ({
  id: randomPostID(),
  url: `photos/${getRandomPositiveInteger(1, PostsQuantity)}`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  likes: getRandomPositiveInteger(15, 200),
  comments: createCommentsArray(getRandomPositiveInteger(0, 30))
});

const createPostsArray = (number) => {
  const POSTS = [];
  for (let i = 0; i < number; i++) {
    POSTS.push(createPost());
  }
  return POSTS;
};
export {createPost};
export {createPostsArray};
