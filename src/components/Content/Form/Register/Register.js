import React, { useEffect, useState } from 'react'
import cl from "./Register.module.scss"
import GlobalSvgSelector from "../../../../GlobalSvgSelector";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../Loader/Loader';
import { registerUser, setErrorRegister } from '../../../../store/Slices/authSlice';
import { useNavigate } from "react-router-dom";

export default function Login({ visible }) {

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userBlockActive, setUserBlockActive] = useState(false);
    const [passBlockActive, setPassBlockActive] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const isAuthentification = useSelector(state => state.auth.isAuthentification);
    const registerError = useSelector(state => state.auth.registerError);

    const togglePasswordVisible = () => setPasswordVisible(state => !state);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(registerUser(data.userName, data.userPass, navigate));
    }

    //animate effect handlers
    const focusHandlerPass = () => setPassBlockActive(true);
    const focusHandlerUser = () => {
        dispatch(setErrorRegister({ error: false }));
        setUserBlockActive(true);
    };

    useEffect(() => () => dispatch(setErrorRegister({ error: false })), []);

    const blurHandlerPass = (e) => e.target.value === "" ? setPassBlockActive(false) : null;
    const blurHandlerUser = (e) => e.target.value === "" ? setUserBlockActive(false) : null;

    return (
        <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <Loader visible={isAuthentification} />
            <div className={ userBlockActive ? `${cl.block} ${cl.active}` : cl.block }>
                <div className={cl.icon}>
                    <GlobalSvgSelector name="user" />
                </div>
                <div className={cl.inpBlock}>
                    <label htmlFor="user-input" className={cl.label}>Ваш логин</label>
                    <input 
                    type="text" 
                    id="user-input" 
                    className={cl.input} 
                    autoComplete="off"
                    { ...register("userName", { 
                        required: "Поле не может быть пустым",
                        maxLength: {
                            value: 20,
                            message: "Поле не может содержать больше 20 символов"
                        }
                    }) }
                    onFocus={focusHandlerUser}
                    onBlur={blurHandlerUser}
                    />
                </div>
            </div>
            <div className={cl.error}>
                { errors?.userName?.message || registerError }
            </div>
            <div className={ passBlockActive ? `${cl.block} ${cl.active}` : cl.block }>
                <div className={cl.icon}>
                    <GlobalSvgSelector name="password" />
                </div>
                <div className={cl.inpBlock}>
                    <label htmlFor="user-pass" className={cl.label}>Ваш пароль</label>
                    <input 
                    type={ passwordVisible ? "text" : "password" } 
                    id="user-pass" 
                    className={`${cl.input} ${cl.passInp}`} 
                    autoComplete="off"
                    { ...register("userPass", {
                        required: "Поле не может быть пустым",
                        minLength: {
                            value: 6,
                            message: "Поле должно включать минимум 6 символов"
                        }
                    }) }
                    onFocus={focusHandlerPass}
                    onBlur={blurHandlerPass}
                    />
                    <button 
                    className={cl.eye}
                    onClick={togglePasswordVisible}
                    type="button"
                    >
                        {passwordVisible
                            ? <GlobalSvgSelector name="show-eye" />
                            : <GlobalSvgSelector name="hide-eye" />
                        }
                    </button>
                </div>
            </div>
            <div className={cl.error}>{ errors?.userPass?.message }</div>
            <button type="submit" className={`${cl.submitBtn} ${cl.reg}`}>Зарегистрироваться</button>
        </form>
    )
}