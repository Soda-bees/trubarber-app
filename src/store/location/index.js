import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'managelocation',
    initialState: {
        location: null,
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        removelocation: state => {
            state.location = null;
        },
    },
});

export const { setLocation, removelocation } = locationSlice.actions;
export const selectlocation = state => state.location.location;
export default locationSlice.reducer;