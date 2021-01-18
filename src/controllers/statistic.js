import axios from 'axios';
import { API_URLS, ERROR_CODES } from '../core/constraint';

const getStatistic = async ({
  token
}) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(API_URLS.STATISTIC, options);

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

module.exports = {
  getStatistic,
};
