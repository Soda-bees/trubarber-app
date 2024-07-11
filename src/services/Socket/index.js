import io from "socket.io-client"
import { BASE_URL } from "../config/AxiosInstance"
import { addAppoinment, addMessageInChatRoom, updateAppointmendStatus } from "../../store/userData";

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

    socket.on('newAppoinment', handleReceivedNewAppoinment)
    socket.on('appointmentStatusUpdate', handleUpdateAppointmendStatus)
    socket.on('newMessage', handleAddNewMessage)

    const cleanup = () => {
        socket.off('newAppoinment', handleReceivedNewAppoinment);
        socket.off('appointmentStatusUpdate', handleUpdateAppointmendStatus);
        socket.off('newMessage', handleAddNewMessage);
    }
    return cleanup
}

export { socket, socketService }