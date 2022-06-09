
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    text: null,
    mode: null
}

const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {
        showNotice(state, action) {
            state.isVisible = true;
            state.text = action.payload.text;
            state.mode = action.payload.mode;
        },
        hideNotice(state, action) {
            state.isVisible = false;
        }
    }
});

const { showNotice, hideNotice } = noticeSlice.actions;

export { showNotice, hideNotice }
export default noticeSlice.reducer;
