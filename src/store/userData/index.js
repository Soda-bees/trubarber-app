import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const { setUserData, removeUserData } = userDataSlice.actions
export const selectUserData = state => state.user.userData
export default userDataSlice.reducer