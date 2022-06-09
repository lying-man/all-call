import React, { useEffect, useRef, useState } from 'react'
import cl from "./SendMessage.module.scss"
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../Loader/Loader';
import { useForm } from "react-hook-form";
import { sendMessage, resetError } from '../../../store/Slices/sendErrorsSlice';

export default function SendMessage() {

    const name = useSelector(state => state.auth.name);
    const { error, isLoading } = useSelector(state => state.send);
    const textRef = useRef(null);
    const [height, setHeight] = useState(25);
    const { register, formState: { errors, isSubmitSuccessful, isValid }, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const [userActive, setUserActive] = useState(false);
    const [textActive, setTextActive] = useState(false);

    const onSubmit = (data) => { 
        dispatch(sendMessage(data.sendingUserName, name, data.userMessage));
    }

    useEffect(() => () => dispatch(resetError()), []);

    const userInputFocusHandler = () => {
        setUserActive(true);
        dispatch(resetError());
    }

    return (
        <div className={cl.wrapper}>
            <Loader visible={isLoading} />
            <form className={cl.box} onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.title}>Отправка сообщения</div>

                <div className={ userActive ? `${cl.block} ${cl.active}` : cl.block }>
                    <div className={cl.label}>Укажите адресат</div>
                    <input 
                    type="text" 
                    className={cl.input} 
                    autoComplete="off" 
                    { ...register("sendingUserName", {
                        required: "Поле не может быть пустым",
                    }) }
                    onBlur={ (e) => {if (e.target.value.trim() === "") setUserActive(false)} }
                    onFocus={userInputFocusHandler}
                    />
                </div>

                <div className={cl.error}>{errors?.sendingUserName?.message || error}</div>

                <div className={  textActive ? `${cl.block} ${cl.active}` : cl.block }>
                    <div className={cl.labelMessage}>Ваше сообщение</div>
                    <textarea 
                    style={{ minHeight: height }}
                    { ...register("userMessage", {
                        required: "Поле не может быть пустым",
                        onChange: (e) => {
                            textRef.current.textContent = e.target.value;
                            setHeight(textRef.current.offsetHeight);
                        }
                    }) }
                    onBlur={ (e) => {if (e.target.value.trim() === "") setTextActive(false)} }
                    onFocus={ () => setTextActive(true) }
                    className={cl.textarea}>
                    </textarea>
                    <div className={cl.getText} ref={textRef}></div>
                </div>

                <div className={cl.error}>{errors?.userMessage?.message}</div>

                <button className={cl.submit}>Отправить</button>
            </form>
        </div>
    )
}
