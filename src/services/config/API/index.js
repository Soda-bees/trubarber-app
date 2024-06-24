import axios from 'axios';
import {axiosInstance} from '../AxiosInstance';
import {BASE_URL} from '../AxiosInstance';

export const checkServerConnection = async () => {
  try {
    const response = await axiosInstance.get('');
    return response;
  } catch (error) {
    return error;
  }
};

export const validateEmailAvailability = async email => {
  try {
    const response = await axiosInstance.post(
      'auth/validateEmailAvailability',
      {email},
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const signin = async body => {
  try {
    const response = await axiosInstance.post('auth/signin', body);
    return response;
  } catch (error) {
    return error;
  }
};

export const signup = async body => {
  try {
    console.log(body);
    const response = await axiosInstance.post('auth/signup', body);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllBarber = async token => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get('user/allBarber');
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadProfile = async formData => {
  try {
    const axiosConfig = {
      method: 'post',
      // url: `http://192.168.100.112:6000/user/uploadProfile`,
      url: `${BASE_URL}user/uploadProfile`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = await axios(axiosConfig);
    return data;
  } catch (error) {
    return error;
  }
};

export const uploadMultiplesImages = async formData => {
  try {
    const axiosConfig = {
      method: 'post',
      // url: `http://192.168.100.112:6000/user/uploadProfile`,
      url: `${BASE_URL}barber/uploadMultiplesImages`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = await axios(axiosConfig);
    return data;
  } catch (error) {
    return error;
  }
};
