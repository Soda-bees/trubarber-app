import { combineReducers } from '@reduxjs/toolkit';
import roleSlice from "./role"
import authReducer from './authToken';
import userDataSlice from "./userData"
import locationSlice from './location';
import barberSlice from './barber';
import cartSlice from './cart';
import paymentCardSlice from "./paymentCard"


const rootReducer = combineReducers({
    role: roleSlice,
    auth: authReducer,
    user: userDataSlice,
    location: locationSlice,
    barber: barberSlice,
    cart: cartSlice,
    payment: paymentCardSlice
});
export default rootReducer;