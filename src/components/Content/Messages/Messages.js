import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../../store/Slices/messagesSlice';
import MessageItem from './MessageItem/MessageItem';
import cl from "./Messages.module.scss";
import LetterIcon from "../../../assets/letter.svg";
import GlobalSvgSelector from "../../../GlobalSvgSelector";
import Filter from './Filter/Filter';
import { setSelectMode } from "../../../store/Slices/selectSlice";

export default function Messages() {

    const { messages, isLoading } = useSelector(state => state.messages);
    const auth = useSelector(state => state.auth.isAuth);
    const name = useSelector(state => state.auth.name);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth) {
            if (messages.length) return;
            dispatch(getMessages(name, "all"));
        }
    }, []);

    if (!auth) return null;

    const displayContent = () => {

        if (isLoading) return <div className={cl.loader} />

        if (messages.length) {
            return messages.map(el => <MessageItem id={el.id} name={el.name} date={el.date} text={el.text} key={el.id} />)
        }

        return (
            <div className={cl.default}>
                <div className={cl.icon}>
                    <img src={LetterIcon} alt="letter icon" />
                </div>
                <div className={cl.text}>У вас пока нет сообщений</div>
            </div>
        )

    }

    const refreshMessages = () => {
        if (isLoading) return;
        dispatch(setSelectMode({ mode: "all" }))
        dispatch(getMessages(name, "all"));
    }

    return (
        <div className={cl.box}>
            <div className={cl.refresh}>
                <button 
                className={ isLoading ? `${cl.refreshBtn} ${cl.disable}` : cl.refreshBtn }
                onClick={refreshMessages}
                >
                    <GlobalSvgSelector name="refresh" />
                </button>
            </div>
            <Filter />
            <div className={ !messages.length || isLoading ? `${cl.inner} ${cl.center}` : cl.inner }>
                { displayContent() }
            </div>
        </div>
    )
}
