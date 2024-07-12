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
            console.log("addAndUpdateNewChat redux", formatToJSON(newChat));
            if (state.userData && newChat.user._id === state.userData._id || newChat.barber._id === state.userData._id) {
                const existingChatIndex = state.userData.chat.findIndex(chat => chat._id === newChat._id);
                if (existingChatIndex !== -1) {
                    // Replace the existing chat with newChat
                    state.userData.chat[existingChatIndex] = newChat;
                } else {
                    // Add newChat to userData.chat
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
    setSeenTrueRedux
} = userDataSlice.actions
export const selectUserData = state => state.user.userData
export default userDataSlice.reducer