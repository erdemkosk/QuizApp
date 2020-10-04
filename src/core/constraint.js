const baseUrl = 'https://quiz-it-api.herokuapp.com/api/';

const API_URLS = {
  LOGIN: `${baseUrl}member/login/`,
  REGISTER: `${baseUrl}member/register/`,
};

const ERROR_CODES = {
  NOT_FOUND: 404,
  VALUE_NOT_RIGHT: 422,
};
module.exports = {
  API_URLS,
  ERROR_CODES
};
