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