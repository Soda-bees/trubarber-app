import io from "socket.io-client"
import { BASE_URL } from "../config/AxiosInstance"
import {
  addAndUpdateNewChatInRedux,
  addAppoinment,
  addMessageInChatRoom,
  addNewChatInRedux,
  updateAppointmendStatus,
  addReview, deleteReview, updateReview,
  addNewNotificationRedux
} from "../../store/userData";

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

  const handleUpdateAppointmendStatus = (data) => {
    dispatch(updateAppointmendStatus(data))
  }

  const handleAddNewMessage = async (data) => {
    console.log("new message" , data);
    dispatch(addMessageInChatRoom(data))
  }

  const handleAddNewChatRoom = async (data) => {
    dispatch(addNewChatInRedux(data))
  }

  const handleAddAndUpdateNewChat = async (data) => {
    dispatch(addAndUpdateNewChatInRedux(data))
  }

  const handleAddNewReview = data => {
    dispatch(addReview(data));
  };
  const handleUpdateReview = data => {
    dispatch(updateReview(data));
  };
  const handleDeleteReview = data => {
    console.log(data);
    dispatch(deleteReview(data));
  };

  const handleNewNotification = data =>{
    dispatch(addNewNotificationRedux(data))
  }


  socket.on('newAppoinment', handleReceivedNewAppoinment)
  socket.on('appointmentStatusUpdate', handleUpdateAppointmendStatus)
  socket.on('newMessage', handleAddNewMessage)
  socket.on('newChatRoom', handleAddNewChatRoom)
  socket.on('existingChatRoomUpdate', handleAddAndUpdateNewChat)
  socket.on('newReview', handleAddNewReview);
  socket.on('updateReview', handleUpdateReview);
  socket.on('deleteReview', handleDeleteReview);
  socket.on('newNotification', handleNewNotification);

  

  const cleanup = () => {
    socket.off('newAppoinment', handleReceivedNewAppoinment);
    socket.off('appointmentStatusUpdate', handleUpdateAppointmendStatus);
    socket.off('newMessage', handleAddNewMessage);
    socket.off('newChatRoom', handleAddNewChatRoom);
    socket.off('existingChatRoomUpdate', handleAddAndUpdateNewChat);
    socket.off('newReview', handleAddNewReview);
    socket.off('updateReview', handleUpdateReview);
    socket.off('deleteReview', handleDeleteReview);
    socket.off('newNotification', handleNewNotification);
    
  }
  return cleanup
}


export { socket, socketService };
