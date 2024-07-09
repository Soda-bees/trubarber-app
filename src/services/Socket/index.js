import io from "socket.io-client"
import { BASE_URL } from "../config/AxiosInstance"
import { addAppoinment, updateAppointmendStatus } from "../../store/userData";

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
        console.log("frontend handle Received New status update", data);
        dispatch(updateAppointmendStatus(data))
    }

    socket.on('newAppoinment', handleReceivedNewAppoinment)
    socket.on('appointmentStatusUpdate', handleUpdateAppointmendStatus)

    const cleanup = () => {
        socket.off('newAppoinment', handleReceivedNewAppoinment);
        socket.off('appointmentStatusUpdate', handleUpdateAppointmendStatus);
    }
    return cleanup
}

export { socket, socketService }