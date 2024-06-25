import { createSlice } from '@reduxjs/toolkit';

const barberSlice = createSlice({
    name: 'managebarber',
    initialState: {
        barber: null,
    },
    reducers: {
        setBarber: (state, action) => {
            state.barber = action.payload;
        },
        removebarber: state => {
            state.barber = null;
        },
    },
});

export const { setBarber, removebarber } = barberSlice.actions;
export const selectbarber = state => state.barber.barber;
export default barberSlice.reducer;