import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
    name: 'manageRole',
    initialState: {
        role: null,
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        removeRole: state => {
            state.role = null;
        },
    },
});

export const { setRole, removeRole } = roleSlice.actions;
export const selectRole = state => state.role.role;
export default roleSlice.reducer;