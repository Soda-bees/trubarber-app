import axios from 'axios';

// export const BASE_URL = 'http://192.168.100.112:6000/'; //Aleem
export const BASE_URL = 'https://tru-barber-2515ddfdb32f.herokuapp.com/';
// export const BASE_URL = 'http://192.168.100.111:6000/'; //fuzz

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // console.log('Response data:', error.response.data);
      // console.log('Response status:', error.response.status);
      // console.log('Response headers:', error.response.headers);
      return error.response;
    } else if (error.request) {
      // console.log('Request:', error.request);
    } else {
      // console.log('Error:', error.message);
    }
    // console.log('Config:', error.config);
    return Promise.reject(error);
  },
);
