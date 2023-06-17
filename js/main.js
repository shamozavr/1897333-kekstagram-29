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

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return 'превышено максимальное количество генераций';
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const randomID = createRandomIdFromRangeGenerator(1, 25);

const createComment = () => {
  const randomNameIndex = getRandomPositiveInteger(0, NAMES.length - 1);
  const randomMessageIndex = getRandomPositiveInteger(0, MESSAGES.length - 1);
  const randomAvatarNumber = getRandomPositiveInteger(1, 6);
  return {
    id: randomID(), //любое число. Идентификаторы не должны повторяться.
    avatar: `img/avatar-${randomAvatarNumber}`, //это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
    message: MESSAGES[randomMessageIndex], //вам необходимо взять одно или два случайных предложения из представленных
    name: NAMES[randomNameIndex] // берем из массива имен
  };
};

const createCommentsArray = (number) => {
  const COMMENTS = [];
  for (let i = 0; i < number; i++) {
    COMMENTS.push(createComment());
  }
  return COMMENTS;
};
