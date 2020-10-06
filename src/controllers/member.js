import axios from 'axios';
import { API_URLS, ERROR_CODES } from '../core/constraint';

const postMemberLogin = async ({ email, password }) => {
  try {
    const data = {
      email,
      password,
    };
    const response = await axios.post(API_URLS.LOGIN, data);
    console.log(response.data);
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

const postMemberRegister = async ({ email, password, nameSurname }) => {
  try {
    const data = {
      email,
      password,
      nameSurname,
    };
    const response = await axios.post(API_URLS.REGISTER, data);
    console.log(response.data);
    return response;
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
  postMemberLogin,
  postMemberRegister,
};
