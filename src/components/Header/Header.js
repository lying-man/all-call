import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GlobalSvgSelector from '../../GlobalSvgSelector'
import cl from "./Header.module.scss"
import { showMenu } from "../../store/Slices/menuSlice"

export default function Header() {

    const auth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const openMenu = () => dispatch(showMenu());

    return (
        <div className={cl.header}>
            <div className={cl.wrapper}>
                <div className={cl.logo}>Ответят всем</div>
                { auth ? <button className={cl.burger} onClick={openMenu}><GlobalSvgSelector name="menu" /></button> : null }
            </div>
        </div>
    )
}
