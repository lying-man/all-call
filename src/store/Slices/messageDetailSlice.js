import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null,
}

const messageDetailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload.message;
        }
    }
})

const { setMessage } = messageDetailSlice.actions;

export { setMessage }
export default messageDetailSlice.reducer;