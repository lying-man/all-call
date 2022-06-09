
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import menuReducer from "./Slices/menuSlice";
import messagesReducer from "./Slices/messagesSlice";
import messageReducer from "./Slices/messageDetailSlice"
import sendMessageReducer from "./Slices/sendErrorsSlice"
import selectReducer from "./Slices/selectSlice"
import noticeReducer from "./Slices/noticeSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        messages: messagesReducer,
        message: messageReducer,
        send: sendMessageReducer,
        select: selectReducer,
        notice: noticeReducer,
    }
});

export { store }