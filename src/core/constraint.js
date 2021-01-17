const baseUrl = 'https://quiz-it-api.herokuapp.com/api/';

const API_URLS = {
  LOGIN: `${baseUrl}member/login/`,
  REGISTER: `${baseUrl}member/register/`,
  QUESTION: `${baseUrl}question`,
  FILL_IN_BLANKS: `${baseUrl}question/fill-in-blanks`,
  FORGET_PASSWORD: `${baseUrl}member/forget-password/`,
  GET_MEMBER: `${baseUrl}member/?id=`,
  UPDATE_MEMBER: `${baseUrl}member/?id=`
};

const ERROR_CODES = {
  UNAUTHORIZED: 401,
  NOT_VALID_TOKEN: 403,
  NOT_FOUND: 404,
  VALUE_NOT_RIGHT: 422,
};

const QUIZ_TYPES = {
  QUIZ_GAME: 1,
  QUIZ_BASIC: 2,
  FILL_IN_BLANKS: 3,
};

const COLORS = {
  SELECTED: '#1266F1',
  SUCCESS: '#00B74A',
  WRONG: '#F93154',
  DEFAULT: '#6C757D',
};

const STATE_COLORS = ['#1abc9c', '#3498db', '#8e44ad', '#d35400', '#c0392b'];

const SPEED_ICONS = ['speedometer-slow', 'speedometer-medium', 'speedometer'];

const RETRY_MESSAGES = ['Hadi Tekrar Başlayalım 🤙', 'Daha bu başlangıç 🤩', 'Kol Bozuktu 🔥', 'Hızlanmak şart 😋', 'Bir daha deneyeyim 😬'];

module.exports = {
  API_URLS,
  ERROR_CODES,
  SPEED_ICONS,
  RETRY_MESSAGES,
  COLORS,
  STATE_COLORS,
  QUIZ_TYPES
};
