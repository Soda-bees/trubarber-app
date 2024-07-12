import io from "socket.io-client"
import { BASE_URL } from "../config/AxiosInstance"
import { addAndUpdateNewChatInRedux, addAppoinment, addMessageInChatRoom, addNewChatInRedux, updateAppointmendStatus } from "../../store/userData";

let socket;

const connectSocket = () => {
    if (!socket) {
        socket = io(BASE_URL)

        socket.on('connect', () => {
            console.log("connected to server");
        })
    }
}

const socketService = (dispatch, authToken, userData) => {
    connectSocket()

    const handleReceivedNewAppoinment = (data) => {
        dispatch(addAppoinment(data))
    }

    const handleUpdateAppointmendStatus = (data) => {
        dispatch(updateAppointmendStatus(data))
    }

    const handleAddNewMessage = async (data) => {
        // console.log("handleAddNewMessage", data)
        dispatch(addMessageInChatRoom(data))
    }

    const handleAddNewChatRoom = async (data) => {
        console.log("new chat socket");
        dispatch(addNewChatInRedux(data))
    }

    const handleAddAndUpdateNewChat = async (data) => {
        console.log("handleAddAndUpdateNewChat socket");
        dispatch(addAndUpdateNewChatInRedux(data))
    }

    socket.on('newAppoinment', handleReceivedNewAppoinment)
    socket.on('appointmentStatusUpdate', handleUpdateAppointmendStatus)
    socket.on('newMessage', handleAddNewMessage)
    socket.on('newChatRoom', handleAddNewChatRoom)
    socket.on('existingChatRoomUpdate', handleAddAndUpdateNewChat)

    const cleanup = () => {
        socket.off('newAppoinment', handleReceivedNewAppoinment);
        socket.off('appointmentStatusUpdate', handleUpdateAppointmendStatus);
        socket.off('newMessage', handleAddNewMessage);
        socket.off('newChatRoom', handleAddNewChatRoom);
        socket.off('existingChatRoomUpdate', handleAddAndUpdateNewChat);
    }
    return cleanup
}

export { socket, socketService }