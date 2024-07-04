import { createSlice } from "@reduxjs/toolkit";

const paymentCardSlice = createSlice({
    name: "paymentCard",
    initialState: {
        paymentCard: null
    },
    reducers: {
        addPaymentCard: (state, action) => {
            state.paymentCard = action.payload
        },
        removePaymentCard: (state) => {
            state.paymentCard = null
        },
    }
})

export const { addPaymentCard , removePaymentCard } = paymentCardSlice.actions
export const selectPaymentCard = state => state.payment.paymentCard
export default paymentCardSlice.reducer