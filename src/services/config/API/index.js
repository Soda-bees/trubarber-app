import axios from 'axios';
import { axiosInstance } from '../AxiosInstance';
import { BASE_URL } from '../AxiosInstance';

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
      { email },
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
    const response = await axiosInstance.post('auth/signup', body);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleBarberSignup = async body => {
  try {
    const response = await axiosInstance.post('auth/barberSignup', body);
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

export const updateProfile = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('auth/updateProfile', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}

export const updatePassword = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('auth/updatePassword', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}

export const handleForgotPass = async (body) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post('auth/forgotPassword', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}

export const resetPassword = async (body) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post('auth/resetPassword', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}

export const addServices = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const response = await axiosInstance.post('barber/addService', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}

export const getAddressFromCoordinates = async (latitude, longitude) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCbWOArVUIn-uRQ8S3fsvayHrep5El4ab4';
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
    );
    if (response.data.status === 'OK') {
      const addressComponents = response.data.results[0].address_components;
      const area =
        addressComponents.find(component =>
          component.types.includes('sublocality_level_1'),
        )?.long_name || '';
      const city =
        addressComponents.find(component =>
          component.types.includes('locality'),
        )?.long_name || '';
      return { area, city }
      // setAddress({ area, city });
      // console.log(area, city);
    } else {
      console.log('Error fetching address:', response.data.status);
      return response?.data?.status
    }
  } catch (error) {
    console.log('Error in geocoding:', error);
    return error
  }
};


export const updateService = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const response = await axiosInstance.post('barber/updateService', body, { headers });
    return response;
  } catch (error) {
    return error
  }
}