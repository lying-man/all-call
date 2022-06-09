import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        showMenu(state, action) {
            state.isVisible = true;
        },
        hideMenu(state, action) {
            state.isVisible = false;
        }
    }
});

const { showMenu, hideMenu } = menuSlice.actions;

export { showMenu, hideMenu }
export default menuSlice.reducer;