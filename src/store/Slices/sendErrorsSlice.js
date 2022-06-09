import { createSlice } from "@reduxjs/toolkit";
import { showNotice } from "./noticeSlice";

const initialState = {
    error: null,
    isLoading: false
}

const sendErrorsSlice = createSlice({
    name: "send-errors",
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload.error;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload.mode;
        },
        resetError(state, action) {
            state.error = null;
        }
    }
})

const { setError, setIsLoading, resetError } = sendErrorsSlice.actions;

//thunk
const sendMessage = (name, sender, text) => {

    return async (dispatch) => {

        dispatch(setIsLoading({ mode: true }));

        try {
            const response = await fetch("http://call-app.openode.dev/user/send", {
                method: "POST",
                body: JSON.stringify({ name, sender, text }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "no-cors"
                }
            });
            const data = await response.json();

            if (data.error) {
                dispatch(setError({ error: data.error }));
                return;
            }

            dispatch(showNotice({ text: "Сообщение успешно отправлено", mode: "success" }));

        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsLoading({ mode: false }));
        }

    }

}

export { setError, setIsLoading, sendMessage, resetError }
export default sendErrorsSlice.reducer;
