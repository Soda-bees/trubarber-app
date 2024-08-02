import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
    name: 'manageRole',
    initialState: {
        role: "user",
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        removeRole: state => {
            state.role = "user";
        },
    },
});

export const { setRole, removeRole } = roleSlice.actions;
export const selectRole = state => state.role.role;
export default roleSlice.reducer;