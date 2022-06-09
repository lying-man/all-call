import React, { useState } from 'react'
import cl from "./Form.module.scss"
import TransitionComponent from "./TransitionComponent"

export default function Form() {

    const [mode, setMode] = useState("auth");

    return (
        <div className={cl.form}>
            <div className={cl.title}>Войти в систему</div>
            <div className={cl.panel}>
                <button 
                className={ mode === "auth" ? `${cl.login} ${cl.active}` : cl.login } 
                onClick={() => setMode("auth")}
                >
                    Аутентификация
                </button>
                <button 
                className={ mode === "register" ? `${cl.register} ${cl.active}` : cl.register } 
                onClick={() => setMode("register")}
                >
                    Регистрация
                </button>
            </div>
            <TransitionComponent mode={mode} />
        </div>
    )
}
