import { createSlice } from "@reduxjs/toolkit";
import { showNotice } from "./noticeSlice";

const initialState = {
    messages: [],
    isLoading: false,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload.messages;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload.mode;
        },
        deleteMessageById(state, action) {
            let id = action.payload.id;
            let filteredMessages = state.messages.filter(el => el.id === id ? false : true);
            state.messages = filteredMessages;
        },
        resetMessages(state, action) {
            state.messages = [];
        }
    }
});


//thunks
const getMessages = (name, mode) => {
    return async (dispatch) => {
        
        dispatch(setIsLoading({ mode: true }));

        try {
            const data = await fetch(`http://localhost:4000/user/messages?name=${name}&mode=${mode}`);
            const messages = await data.json();
            dispatch(setMessages({messages}));
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsLoading({ mode: false }));
        }

    }
}

const deleteMessage = (id) => {
    return async (dispatch) => {

        try {

            const response = await fetch("http://localhost:4000/message/delete", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            dispatch(showNotice({ text: "Сообшение удалено", mode: "success" }));
            
        } catch (e) {
            console.log(e);
        }
        
    }
}

const { deleteMessageById, setMessages, setIsLoading, resetMessages } = messagesSlice.actions;

export { getMessages, deleteMessage, deleteMessageById, resetMessages };
export default messagesSlice.reducer;