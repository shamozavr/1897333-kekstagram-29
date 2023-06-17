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
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
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


const createComment = () => {
  const randomNameIndex = getRandomPositiveInteger(0, NAMES.length - 1);
  const randomMessageIndex = getRandomPositiveInteger(0, MESSAGES.length - 1);
  const randomAvatarNumber = getRandomPositiveInteger(1, 6);
  const randomID = createRandomIdFromRangeGenerator(1, 25);
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

console.log(createCommentsArray(25));
