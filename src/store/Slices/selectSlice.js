
import { createSlice } from "@reduxjs/toolkit";

const selectSlice = createSlice({
    name: "select",
    initialState: { selectMode: null },
    reducers: {
        setSelectMode(state, action) {
            state.selectMode = action.payload.mode;
        },
        resetMode(state, action) {
            state.selectMode = null;
        }
    }
});

const { setSelectMode, resetMode } = selectSlice.actions;

export { setSelectMode, resetMode }
export default selectSlice.reducer;
