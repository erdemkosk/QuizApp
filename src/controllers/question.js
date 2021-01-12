import axios from 'axios';
import { API_URLS, ERROR_CODES } from '../core/constraint';

const getQuestion = async ({ difficulty }) => {
  try {
    const response = await axios.get(`${API_URLS.QUESTION}/?difficulty=${difficulty}`);
    return response.data;
  } catch (error) {
    switch (error.response.data.code) {
      case ERROR_CODES.NOT_FOUND:
        return {
          error: 'Böyle bir kullanıcı bilgisi bulamadık.'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const getFillInBlanks = async ({ difficulty }) => {
  try {
    const response = await axios.get(`${API_URLS.FILL_IN_BLANKS}/?difficulty=${difficulty}`);
    return response.data;
  } catch (error) {
    switch (error.response.data.code) {
      case ERROR_CODES.NOT_FOUND:
        return {
          error: 'Böyle bir kullanıcı bilgisi bulamadık.'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

module.exports = {
  getQuestion,
  getFillInBlanks,

};
