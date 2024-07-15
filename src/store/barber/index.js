import {createSlice} from '@reduxjs/toolkit';

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
    addBarberReview: (state, action) => {
      if (state.barber) {
        const barber = state.barber.find(
          barber => barber._id === action.payload.barberData,
        );
        if (barber) {
          barber.reviews.push(action.payload);
        }
      }
    },
    updateBarberReview: (state, action) => {
      if (state.barber) {
        const barber = state.barber.find(
          barber => barber._id === action.payload.barberData,
        );
        if (barber) {
          const reviewIndex = barber.reviews.findIndex(
            review => review._id === action.payload._id,
          );
          if (reviewIndex !== -1) {
            barber.reviews[reviewIndex] = action.payload;
          }
        }
      }
    },
    deleteBarberReview: (state, action) => {
      if (state.barber) {
        const barber = state.barber.find(
          barber => barber._id === action.payload.barberData,
        );
        if (barber) {
          barber.reviews = barber.reviews.filter(
            review => review._id !== action.payload._id,
          );
        }
      }
    },
  },
});

export const {
  setBarber,
  removebarber,
  addBarberReview,
  updateBarberReview,
  deleteBarberReview,
} = barberSlice.actions;
export const selectbarber = state => state.barber.barber;
export default barberSlice.reducer;
