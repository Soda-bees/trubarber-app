import io from 'socket.io-client';
import {BASE_URL} from '../config/AxiosInstance';
import {
  addAppoinment,
  addReview,
  deleteReview,
  updateAppointmendStatus,
  updateReview,
} from '../../store/userData';

let socket;

const connectSocket = () => {
  if (!socket) {
    socket = io(BASE_URL);

    socket.on('connect', () => {
      console.log('connected to server');
    });
  }
};

const socketService = (dispatch, authToken, userData) => {
  connectSocket();

  const handleReceivedNewAppoinment = data => {
    dispatch(addAppoinment(data));
  };

  const handleUpdateAppointmendStatus = data => {
    console.log('frontend handle Received New status update', data);
    dispatch(updateAppointmendStatus(data));
  };

  const handleAddNewReview = data => {
    console.log('=-----------handleAddNewReview', data);
    dispatch(addReview(data));
  };

  const handleUpdateReview = data => {
    console.log('=-----------handleUpdateReview', data);
    dispatch(updateReview(data));
  };

  const handleDeleteReview = data => {
    console.log(data);
    dispatch(deleteReview(data));
  };

  socket.on('newAppoinment', handleReceivedNewAppoinment);
  socket.on('appointmentStatusUpdate', handleUpdateAppointmendStatus);
  socket.on('newReview', handleAddNewReview);
  socket.on('updateReview', handleUpdateReview);
  socket.on('deleteReview', handleDeleteReview);

  const cleanup = () => {
    socket.off('newAppoinment', handleReceivedNewAppoinment);
    socket.off('appointmentStatusUpdate', handleUpdateAppointmendStatus);
    socket.off('newReview', handleAddNewReview);
    socket.off('updateReview', handleUpdateReview);
    socket.off('deleteReview', handleDeleteReview);
  };
  return cleanup;
};

export {socket, socketService};
