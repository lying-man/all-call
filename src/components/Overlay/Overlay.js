import React, { useRef } from 'react'
import "./Overlay.scss"
import { CSSTransition } from "react-transition-group"

export default function Overlay({ visible, handler }) {

    const nodeRef = useRef(null);

    return (
        <CSSTransition
        in={visible}
        appear={true}
        mountOnEnter
        unmountOnExit
        classNames="overlay-animate"
        timeout={200}
        nodeRef={nodeRef}
        >
            <div 
            className="overlay"
            onClick={handler}
            ref={nodeRef}
            />
        </CSSTransition>
    )
}
