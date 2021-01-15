import axios from 'axios';
import { API_URLS, ERROR_CODES } from '../core/constraint';

const postMemberLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(API_URLS.LOGIN, {
      email,
      password,
    });

    return response.data.results;
  } catch (error) {
    switch (error.response.status) {
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
    return response;
  } catch (error) {
    switch (error.response.status) {
      case ERROR_CODES.NOT_FOUND:
        return {
          error: 'Böyle bir kullanıcı sistemde zaten kayıtlı.'
        };
      case ERROR_CODES.VALUE_NOT_RIGHT:
        return {
          error: 'Girdiğiniz değerler kurallara uygun değildir.'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const forgetPassword = async ({ email }) => {
  try {
    const data = {
      email,
    };
    const response = await axios.post(API_URLS.FORGET_PASSWORD, data);

    return response;
  } catch (error) {
    switch (error.response.status) {
      case ERROR_CODES.NOT_FOUND:
        return {
          error: 'Şuan mail sistemimizde bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
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
  forgetPassword,
};
