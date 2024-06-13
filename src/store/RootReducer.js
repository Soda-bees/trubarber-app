import { combineReducers } from '@reduxjs/toolkit';
import roleSlice from "./role"

const rootReducer = combineReducers({
    role: roleSlice
});
export default rootReducer;