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
    const response = await axiosInstance.post('auth/updateProfile', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('auth/updatePassword', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const handleForgotPass = async body => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post('auth/forgotPassword', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async body => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post('auth/resetPassword', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const addServices = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('barber/addService', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

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
      return { area, city };
      // setAddress({ area, city });
      // console.log(area, city);
    } else {
      console.log('Error fetching address:', response.data.status);
      return response?.data?.status;
    }
  } catch (error) {
    console.log('Error in geocoding:', error);
    return error;
  }
};

export const updateService = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('barber/updateService', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteService = async (token, id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      `barber/deleteService/${id}`,
      {},
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const handleAddPaymentCard = async (card, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      'user/addPaymentCard',
      { card },
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const bookAppoinment = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('user/bookAppoinment', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const hanleGetBookedAppoinment = async (token, id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(
      `user/getBookedAppoinmentTime/${id}`,
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAppointmentStatus = async (token, id , status) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      `barber/updateAppoinmentStatus/${id}`,
      {status},
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const createChatRoom = async (token, body) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('user/createChatRoom', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const sendMessage = async (token, chatId, body) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      `user/sendMessage/${chatId}`,
      body,
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const setSeenTrue = async (token, messageIds) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      `user/setSeenTrue`,
      { messageIds },
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postReview = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('user/postReview', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const updateReview = async (body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post('user/updateReview', body, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteReview = async (reviewId, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(`user/deleteReview/${reviewId}`, {}, { headers },);
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadMultiplesChatImages = async (formData, token) => {
  try {
    const axiosConfig = {
      method: 'post',
      url: `${BASE_URL}barber/uploadMultiplesChatImages`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios(axiosConfig);
    return data;
  } catch (error) {
    return error;
  }
};

export const handleGetUserDetails = async token => {
  try {
    console.log(token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get('user/userData', { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const handleNotificationSeenTrue = async (token, notificationsIds) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      'user/setNotificationTrue',
      { notificationsIds },
      { headers },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteDeviceToken = async token => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      'user/deleteDeviceToken',
      {},
      {
        headers,
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};
