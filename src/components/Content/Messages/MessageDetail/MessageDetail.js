import React from 'react'
import { useSelector } from 'react-redux'
import { formatTimeShort } from '../../../../helpers/formatTimeShort';
import cl from "./MessageDetail.module.scss"
import { useNavigate } from "react-router-dom";

export default function MessageDetail() {

    const { name, date, text } = useSelector(state => state.message.message);
    const navigate = useNavigate();

    return (
        <div className={cl.wrapper}>
            <div className={cl.back}>
                <button 
                className={cl.btn}
                onClick={() => navigate(-1)}
                >
                    Вернуться назад
                </button>
            </div>
            <div className={cl.panel}>
                <div className={cl.box}>
                    <div className={cl.label}>От кого:</div>
                    <div className={cl.value}>{name}</div>
                </div>
                <div className={cl.box}>
                    <div className={cl.label}>Дата отправления:</div>
                    <div className={cl.value}>{ `${formatTimeShort(date)}, ${date.split(",")[1].split(".").join(":")}` }</div>
                </div>
            </div>
            <div className={cl.content}>
                <div className={cl.text}>Сообщение:</div>
                <div className={cl.message}>{text}</div>
            </div>
        </div>
    )
}
