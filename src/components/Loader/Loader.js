import React from 'react'
import cl from "./Loader.module.scss"

export default function Loader({ visible }) {
    return (
        <div className={ visible ? `${cl.loader} ${cl.active}` : cl.loader }>
            <div className={cl.loaderItem}></div>
        </div>
    )
}
