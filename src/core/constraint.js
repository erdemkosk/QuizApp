const baseUrl = 'https://quiz-it-api.herokuapp.com/api/';

const API_URLS = {
  LOGIN: `${baseUrl}member/login/`,
  REGISTER: `${baseUrl}member/register/`,
  QUESTION: `${baseUrl}question`,
  FILL_IN_BLANKS: `${baseUrl}question/fill-in-blanks`,
  FORGET_PASSWORD: `${baseUrl}member/forget-password/`
};

const ERROR_CODES = {
  NOT_FOUND: 404,
  VALUE_NOT_RIGHT: 422,
};

const COLORS = {
  SELECTED: '#1266F1',
  SUCCESS: '#00B74A',
  WRONG: '#F93154',
  DEFAULT: '#6C757D',
};

const STATE_COLORS = ['#1abc9c', '#3498db', '#8e44ad', '#d35400', '#c0392b'];

const WELCOME_MESSAGES = ['Hadi Başlayalım 🤙', 'Tekrar Hoşgeldin 🤩', 'İngilizce Öğrenme Vakti 🔥', 'Hadi biraz antreman 😋', 'Gönderin Gelsin 😬'];
const RETRY_MESSAGES = ['Hadi Tekrar Başlayalım 🤙', 'Daha bu başlangıç 🤩', 'Kol Bozuktu 🔥', 'Hızlanmak şart 😋', 'Bir daha deneyeyim 😬'];

module.exports = {
  API_URLS,
  ERROR_CODES,
  WELCOME_MESSAGES,
  RETRY_MESSAGES,
  COLORS,
  STATE_COLORS
};
