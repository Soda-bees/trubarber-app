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
        }
    }
})

export const { setUserData, removeUserData, updateServiceRedux, deleteServiceRedux, addAppoinment } = userDataSlice.actions
export const selectUserData = state => state.user.userData
export default userDataSlice.reducer