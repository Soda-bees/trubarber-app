import io from "socket.io-client"
import { BASE_URL } from "../config/AxiosInstance"

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
        console.log("frontend handle Received New Appoinment" , data);
    }

    socket.on('newAppoinment' , handleReceivedNewAppoinment)

    const cleanup = () => {
        socket.off('newAppoinment', handleReceivedNewAppoinment);
    }
    return cleanup
}

export { socket, socketService }