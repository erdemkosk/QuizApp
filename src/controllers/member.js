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
          error: 'Şifreniz hatalı yada böyle bir kullanıcı bulunmamaktadır.'
        };
      case ERROR_CODES.VALUE_NOT_RIGHT:
        return {
          error: 'Giriş bilgileri doğru kriterleri karşılamamaktadır. Lütfen bilgilerinizden emin olun.'
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
          error: 'Sistemde böyle bir kullanıcı bulamadık. Tekrar deneyin.'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const getMember = async ({ id, token }) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(API_URLS.GET_MEMBER + id, options);

    return response.data.results.member;
  } catch (error) {
    switch (error.response.status) {
      case ERROR_CODES.UNAUTHORIZED:
        return {
          error: 'Lütfen sistemde tekrar giriş yapın!'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const updateMember = async ({
  id, nameSurname, email, password, token
}) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const data = {
      nameSurname,
      password,
      email,
    };

    const response = await axios.put(API_URLS.UPDATE_MEMBER + id, data, options);

    return response.data.results.member;
  } catch (error) {
    switch (error.response.status) {
      case ERROR_CODES.UNAUTHORIZED:
        return {
          error: 'Lütfen sistemde tekrar giriş yapın!'
        };
      case ERROR_CODES.VALUE_NOT_RIGHT:
        return {
          error: 'Şifreniz 6 karakterden az ve isminiz boş olamaz 🙃'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const getTopten = async () => {
  try {
    const response = await axios.get(API_URLS.TOP_TEN);

    return response.data.results;
  } catch (error) {
    switch (error.response.status) {
      case ERROR_CODES.UNAUTHORIZED:
        return {
          error: 'Lütfen sistemde tekrar giriş yapın!'
        };
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const updateStatistic = async ({
  id, isRightAnswer, point, token
}) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const data = {
      isRightAnswer,
      difficulty: point,
    };

    const response = await axios.put(API_URLS.UPDATE_STATISTICS + id, data, options);

    return response.data.results;
  } catch (error) {
    switch (error.response.status) {
      default:
        return {
          error: 'Internet bağlantınızı kontrol edin !'
        };
    }
  }
};

const setNotificationId = async ({
  id, token, notificationId
}) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const data = {
      notificationId,
    };

    const response = await axios.put(API_URLS.SET_NOTIFICATION_ID + id, data, options);

    return response.data.results;
  } catch (error) {
    switch (error.response.status) {
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
  getMember,
  updateMember,
  getTopten,
  updateStatistic,
  setNotificationId,
};
