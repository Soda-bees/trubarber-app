import axios from 'axios'
import { axiosInstance } from "../AxiosInstance"
import { BASE_URL } from '../AxiosInstance'

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
        const response = await axiosInstance.post('auth/validateEmailAvailability', { email });
        return response
    } catch (error) {
        return error;
    }
};

export const uploadProfile = async formData => {
    try {
      const axiosConfig = {
        method: 'post',
        url: `http://192.168.100.112:6000/user/uploadProfile`,
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