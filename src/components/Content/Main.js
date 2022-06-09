import React, { useEffect } from 'react'
import Form from './Form/Form'
import cl from "./Main.module.scss"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Messages from './Messages/Messages'
import MessageDetail from './Messages/MessageDetail/MessageDetail'
import SendMessage from './SendMessage/SendMessage'

export default function Main() {

    const auth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) navigate("/auth", { replace: true });
    }, []);

    return (
        <div className={cl.wrapper}>
            <Routes>
                <Route path="/" element={<Messages />} />
                <Route path="/send" element={<SendMessage />} />
                <Route path="/auth" element={<Form />} />
                <Route path="/message" element={<MessageDetail />} />
            </Routes>
        </div>
    )
}
