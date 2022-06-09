import React from 'react'
import "./AnimationForms.scss"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import Login from "./Login/Login"
import Register from "./Register/Register"

export default function TransitionComponent({ mode }) {

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
            key={ mode === "auth" ? true : false }
            classNames="form-block"
            timeout={300}
            >
                { mode === "auth" ? <Login /> : <Register /> }
            </CSSTransition>
        </SwitchTransition>
    )
}
