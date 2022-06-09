import React, { useEffect, useRef } from 'react'
import cl from "./Notice.module.scss";
import { hideNotice } from "../../../store/Slices/noticeSlice";
import { useSelector, useDispatch } from "react-redux";

function Notice() {

    const hasTimeout = useRef(false);
    const { isVisible, text, mode } = useSelector(state => state.notice);
    const dispatch = useDispatch();

    useEffect(() => {
        if ( isVisible && !hasTimeout.current ) {
            hasTimeout.current = true;
            setTimeout(() => {
                hasTimeout.current = false;
                handlerHideNotice();
            }, 3000)
        }
    }, [isVisible]);

    const handlerHideNotice = () => dispatch(hideNotice());

    const getClasses = () => {
        let visible = isVisible ? `${cl.wrapper} ${cl.active}` : cl.wrapper;
        let modeColor = mode === "success" ? cl.green : cl.red;
        return `${visible} ${modeColor}`;
    }

    return (
        <div className={ getClasses() }>
            <div className={cl.text}>{text}</div>
            <button className={cl.btn} onClick={handlerHideNotice}>
                <span className={cl.line}></span>
                <span className={cl.line}></span>
            </button>
        </div>
    )
}

export default React.memo(Notice);
