import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cutExcessText } from '../../../../helpers/cutExcessText';
import { formatTimeShort } from '../../../../helpers/formatTimeShort';
import { setMessage } from '../../../../store/Slices/messageDetailSlice';
import { deleteMessage, deleteMessageById } from "../../../../store/Slices/messagesSlice"
import cl from "./MessageItem.module.scss"

function MessageItem({ id, name, date, text }) {

    const dispatch = useDispatch();

    const setDataForRoute = () => dispatch(setMessage({ message: { name, text, date } }))

    const deleteMessageHandler = () => {
        dispatch(deleteMessage(id));
        dispatch(deleteMessageById({id}));
    }

    return (
            <div className={cl.wrapper}>
                <button className={cl.delete} onClick={deleteMessageHandler}>
                    <span className={cl.line}></span>
                    <span className={cl.line}></span>
                </button>
                    <NavLink to="/message" className={cl.item} onClick={setDataForRoute}>
                    <div className={cl.info}>
                        <div className={cl.name}>{name}</div>
                        <div className={cl.date}>{formatTimeShort(date)}</div>
                    </div>
                    <div className={cl.content}>{cutExcessText(text)}</div>
                    </NavLink>
            </div>
    )
}

export default React.memo(MessageItem);
