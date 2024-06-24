import { combineReducers } from '@reduxjs/toolkit';
import roleSlice from "./role"
import authReducer from './authToken';
import userDataSlice from "./userData"
import locationSlice from './location';

const rootReducer = combineReducers({
    role: roleSlice,
    auth: authReducer,
    user: userDataSlice,
    location: locationSlice
});
export default rootReducer;