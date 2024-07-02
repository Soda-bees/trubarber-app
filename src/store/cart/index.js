import {createSlice} from '@reduxjs/toolkit';
import formatToJSON from '../../services/config/FormatToJson';

const cartSlice = createSlice({
  name: 'managecart',
  initialState: {
    cart: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    removeCart: state => {
      state.cart = null;
    },
    updateCart: (state, action) => {
      const index = state?.cart?.services.findIndex(
        service =>
          service?.serviceName == action?.payload?.services[0].serviceName,
      );
      if (index !== -1) {
        state.cart.services[index] = action?.payload?.services[0];
      }
    },
    deleteCartItem: (state, action) => {
      const {name, price, serviceName} = action.payload;
      console.log(state.cart.services);
      state.cart.services = state.cart.services.filter(
        service =>
          service.name !== name ||
          service.price !== price ||
          service.serviceName !== serviceName,
      );
    },
  },
});

export const {setCart, removeCart, updateCart, deleteCartItem} =
  cartSlice.actions;
export const selectCart = state => state.cart.cart;
export default cartSlice.reducer;
