const baseUrl = 'https://quiz-it-api.herokuapp.com/api/';

const API_URLS = {
  LOGIN: `${baseUrl}member/login/`,
  REGISTER: `${baseUrl}member/register/`,
  QUESTION: `${baseUrl}question`,
  FILL_IN_BLANKS: `${baseUrl}question/fill-in-blanks`,
  FORGET_PASSWORD: `${baseUrl}member/forget-password/`,
  GET_MEMBER: `${baseUrl}member/?id=`,
  UPDATE_MEMBER: `${baseUrl}member/?id=`,
  STATISTIC: `${baseUrl}statistic/`,
  TOP_TEN: `${baseUrl}member/top-ten/`,
  UPDATE_STATISTICS: `${baseUrl}member/update-statistic/`,
  SET_NOTIFICATION_ID: `${baseUrl}member/set-notification/`,
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

const STATE_COLORS = ['#fdcb6e', '#F2BB05', '#E01A4F', '#1abc9c', '#3498db', '#8e44ad', '#ff9ff3', '#48dbfb', '#1dd1a1', '#32ff7e', '#40407a', '#3742fa', '#ff6b81'];

const SPEED_ICONS = ['speedometer-slow', 'speedometer-medium', 'speedometer'];

const RETRY_BUTTON_MESSAGES = ['Hadi Tekrar Başlayalım 🤙', 'Daha bu başlangıç 🤩', 'Kol Bozuktu 🔥', 'Hızlanmak şart 😋', 'Bir daha deneyeyim 😬'];
const RETRY_MESSAGES = ['Kaybettik... Ama olsun ingilizce neydi emekti....\nİnsanlar bildikleri dil sayısı kadar hayat yaşarlar. (Çek Atasözü) ', 'Şansımız Yaver gitmedi... \nBir dil bir insan, iki dil iki insan (Türk Atasözü) ', 'Kaybettik... Tekrar deneriz hallederiz....\nYeni bir dil, yeni bir hayat (İran Atasözü) ', 'Kaybettik... Ne kadar çok kelime o kadar akıcı bir ingilizce...\nBir dil öğren, bir savaşı önle. (Arap Atasözü) '];

module.exports = {
  API_URLS,
  ERROR_CODES,
  SPEED_ICONS,
  RETRY_MESSAGES,
  COLORS,
  STATE_COLORS,
  QUIZ_TYPES,
  RETRY_BUTTON_MESSAGES,
};
