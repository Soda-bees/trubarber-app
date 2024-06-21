import { combineReducers } from '@reduxjs/toolkit';
import roleSlice from "./role"
import authReducer from './authToken';
import userDataSlice from "./userData"

const rootReducer = combineReducers({
    role: roleSlice,
    auth: authReducer,
    user: userDataSlice,
});
export default rootReducer;