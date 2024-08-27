import { createSlice } from "@reduxjs/toolkit";
import formatToJSON from "../../services/config/FormatToJson";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    removeUserData: (state) => {
      state.userData = null
    },
    updateServiceRedux: (state, action) => {
      const updatedService = action.payload;
      if (state.userData && state.userData.services) {
        state.userData.services = state.userData.services.map(service =>
          service._id === updatedService._id ? updatedService : service
        );
      }
    },
    deleteServiceRedux: (state, action) => {
      const deletedService = action.payload;
      if (state.userData && state.userData.services) {
        state.userData.services = state.userData.services.filter(
          service => service._id !== deletedService
        );
      }
    },
    addAppoinment: (state, action) => {
      const appoinment = action.payload;
      if (state.userData && appoinment.user._id === state.userData._id) {
        state.userData.appoinment.push(appoinment)
      }
      if (state.userData && appoinment.barber._id === state.userData._id) {
        state.userData.appoinment.push(appoinment)
      }
    },
    updateAppointmendStatus: (state, action) => {
      const { _id, status } = action.payload
      if (state.userData && state.userData.appoinment) {
        state.userData.appoinment = state.userData.appoinment.map(appointment =>
          appointment._id === _id ? { ...appointment, status } : appointment
        );
      }
    },
    addMessageInChatRoom: (state, action) => {
      const { chatRoomId, newMessage } = action.payload
      const chatIndex = state.userData.chat.findIndex(chat => chat._id === chatRoomId);
      if (chatIndex !== -1) {
        // Update the chat room with the new message
        state.userData.chat[chatIndex].messages.push(newMessage);
      }
    },
    addNewChatInRedux: (state, action) => {
      const newChat = action.payload;
      if (state.userData && newChat.user._id === state.userData._id || newChat.barber._id === state.userData._id) {
        state.userData.chat.push(newChat)
      }
    },
    addAndUpdateNewChatInRedux: (state, action) => {
      const newChat = action.payload;
      if (state.userData && newChat.user._id === state.userData._id || newChat.barber._id === state.userData._id) {
        const existingChatIndex = state.userData.chat.findIndex(chat => chat._id === newChat._id);
        if (existingChatIndex !== -1) {
          state.userData.chat[existingChatIndex] = newChat;
        } else {
          state.userData.chat.push(newChat);
        }
      }
    },
    setSeenTrueRedux: (state, action) => {
      const { chatRoomId, messageIds } = action.payload;
      const updatedChats = state.userData.chat.map(chat => {
        if (chat._id === chatRoomId) {
          const updatedMessages = chat.messages.map(message => {
            if (messageIds.includes(message._id)) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });

          return {
            ...chat,
            messages: updatedMessages,
          };
        }
        return chat;
      });

      return {
        ...state,
        userData: {
          ...state.userData,
          chat: updatedChats,
        },
      };
    },
    addReview: (state, action) => {
      const review = action.payload;
      if (state.userData && review.userData._id === state.userData._id) {
        console.log('Userrrrrrrrrrrrr', review);
        return {
          ...state,
          userData: {
            ...state.userData,
            reviews: [...state.userData.reviews, review],
          },
        };
      }
      if (state.userData && review.barberData === state.userData._id) {
        console.log('Barberrrrrrrrrr', review);
        return {
          ...state,
          userData: {
            ...state.userData,
            reviews: [...state.userData.reviews, review],
          },
        };
      }
    },
    updateReview: (state, action) => {
      const updatedReview = action.payload;
      if (state.userData) {
        if (
          updatedReview.userData._id === state.userData._id ||
          updatedReview.barberData === state.userData._id
        ) {
          console.log('Review update:', updatedReview);
          const reviewIndex = state.userData.reviews.findIndex(
            review => review._id === updatedReview._id,
          );
          if (reviewIndex !== -1) {
            state.userData.reviews[reviewIndex] = updatedReview;
          }
        }
      }
    },
    deleteReview: (state, action) => {
      const deletedReview = action.payload;
      if (state.userData) {
        if (
          deletedReview.userData._id === state.userData._id ||
          deletedReview.barberData === state.userData._id
        ) {
          console.log('Review delete:', deletedReview);
          const reviewIndex = state.userData.reviews.findIndex(
            review => review._id === deletedReview._id,
          );
          if (reviewIndex !== -1) {
            state.userData.reviews.splice(reviewIndex, 1);
          }
        }
      }
      return state;
    },
    addNewNotificationRedux: (state, action) => {
      const newNotification = action.payload;
      if (state.userData && newNotification.user === state.userData._id || newNotification.barber === state.userData._id) {
        state.userData.notification.push(newNotification);
      }
    },
    setNotificationSeenTrueRedux: (state, action) => {
      if (state.userData && state.userData.role === 'user') {
        const updatedNotifications = state.userData.notification.map((notif) => ({
          ...notif,
          userSeen: true,
        }));

        const updatedUserData = {
          ...state.userData,
          notification: updatedNotifications,
        };
        state.userData = updatedUserData;
      } else {
        const updatedNotifications = state.userData.notification.map((notif) => ({
          ...notif,
          barberSeen: true,
        }));

        const updatedUserData = {
          ...state.userData,
          notification: updatedNotifications,
        };
        state.userData = updatedUserData;
      }
    },
    addFavouritesRedux: (state, action) => {
      const barber = action.payload; 
      const barberId = barber._id;

      const index = state.userData.favourites.findIndex(fav => fav._id === barberId);
      if (index > -1) {
        state.userData.favourites.splice(index, 1);
      } else {
        state.userData.favourites.push(barber);
      }


    }
  }
})

export const {
  setUserData,
  removeUserData,
  updateServiceRedux,
  deleteServiceRedux,
  addAppoinment,
  updateAppointmendStatus,
  addMessageInChatRoom,
  addNewChatInRedux,
  addAndUpdateNewChatInRedux,
  setSeenTrueRedux,
  addReview,
  updateReview,
  deleteReview,
  addNewNotificationRedux,
  setNotificationSeenTrueRedux,
  addFavouritesRedux
} = userDataSlice.actions
export const selectUserData = state => state.user.userData
export default userDataSlice.reducer