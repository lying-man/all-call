import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import cl from "./Menu.module.scss"
import { hideMenu } from '../../../store/Slices/menuSlice';
import Overlay from '../../Overlay/Overlay';
import { showNotice } from '../../../store/Slices/noticeSlice';
import { unlogin } from '../../../store/Slices/authSlice';
import { resetMessages } from "../../../store/Slices/messagesSlice";
import { resetMode } from "../../../store/Slices/selectSlice";

export default function Menu() {

    const auth = useSelector(state => state.auth.isAuth);
    const name = useSelector(state => state.auth.name);
    const menuVisible = useSelector(state => state.menu.isVisible);
    const dispatch = useDispatch();

    if (!auth) return null;

    const closeMenu = () => {
        dispatch(hideMenu());
    }

    return (
        <React.Fragment>
            <div className={ menuVisible ? `${cl.wrapper} ${cl.active}` : cl.wrapper }>
                <div className={cl.header}>
                    <div className={cl.title}>Меню</div>
                    <button className={cl.close} onClick={closeMenu}>
                        <span className={cl.line}></span>
                        <span className={cl.line}></span>
                    </button>
                </div>
                <div className={cl.name}>{name}</div>
                <div className={cl.links}>
                    <NavLink 
                    to="/" 
                    className={ ({ isActive }) => isActive ? `${cl.link} ${cl.active}` : cl.link }
                    onClick={closeMenu}
                    >
                        Мои сообщения
                    </NavLink>
                    <NavLink 
                    to="/send" 
                    className={ ({ isActive }) => isActive ? `${cl.link} ${cl.active}` : cl.link }
                    onClick={closeMenu}
                    >
                        Отправить сообщение
                    </NavLink>
                    <NavLink 
                    to="/auth" 
                    className={ ({ isActive }) => isActive ? `${cl.link} ${cl.active}` : cl.link }
                    onClick={ () => {
                        closeMenu();
                        dispatch(unlogin());
                        dispatch(resetMessages());
                        dispatch(resetMode());
                        dispatch(showNotice({ text: "Выполнен выход из аккаунта", mode: "error" }));
                    }}
                    >
                        Выйти
                    </NavLink>
                </div>
            </div>
            <Overlay visible={menuVisible} handler={closeMenu} />
        </React.Fragment>
    )
}
