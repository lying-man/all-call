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
            const data = await fetch(`https://nodejs-call-ayah004l1-lying-man.vercel.app/user/messages?name=${name}&mode=${mode}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "no-cors"
                    }
                }
            );
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

            const response = await fetch("https://nodejs-call-ayah004l1-lying-man.vercel.app/message/delete", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "no-cors"
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