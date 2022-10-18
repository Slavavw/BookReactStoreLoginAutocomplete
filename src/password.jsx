const SPECIALS = '!@#$%^&*()_+{}:"<>?\|[]\',./`~';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const ALL = `${SPECIALS}${LOWERCASE}${UPPERCASE}${NUMBERS}`;

const getItterableArray = (length) => Array.from({ length }, (el, index) => index + 1);

const pick = (set, min, max) => {
  let length = min;
  if (max) {
    length += Math.floor(Math.random() * (max - min));
  }
  return getItterableArray(length)
    .map((el, index) => (set.charAt(Math.floor(Math.random() * set.length))))
    .join('');
}

const shufflePassword = (set) => {
  let arr = set.split("");
  let length = arr.length;
  let iterable = getItterableArray(length).reverse();
  let shuffle = iterable.reduce((acc, value) => {
    let randonIndex = Math.floor(Math.random() * value);
    [acc[value - 1], acc[randonIndex]] = [[acc[randonIndex], acc[value - 1]]]
    return acc
  }, [...arr]);
  return shuffle.join('');
}

module.exports = () => {
  let password = pick(SPECIALS, 1).concat(
    pick(UPPERCASE, 1), pick(LOWERCASE, 1), pick(NUMBERS, 1), pick(ALL, 4, 12));
  return shufflePassword(password);
}