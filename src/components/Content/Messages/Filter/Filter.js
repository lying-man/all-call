import React from 'react';
import Select, { components } from "react-select";
import cl from "./Filter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import "./Filter.scss";
import { getMessages } from "../../../../store/Slices/messagesSlice";
import { setSelectMode } from "../../../../store/Slices/selectSlice";

function Filter() {

    const { messages, isLoading } = useSelector(state => state.messages);
    const name = useSelector(state => state.auth.name);
    const mode = useSelector(state => state.select.selectMode);
    const dispatch = useDispatch();

    const options = [
        { value: "all", label: "Все" },
        { value: "new", label: "Сначала новые" },
        { value: "old", label: "Сначала старые" },
        { value: "manyText", label: "Много текста" },
        { value: "littleText", label: "Мало текста" },
        { value: "limit", label: "Меньше 4 сообщений от пользователя" },
    ]

    const changeHandler = (option) => {
       dispatch(getMessages(name, option.value));
       dispatch(setSelectMode({ mode: option.value }));
    }

    const handleCloseMenu = () => {
        const menuEl = document.querySelector(".menu--select");
        const parentMenu = menuEl?.parentElement;
        const clonedMenu = menuEl?.cloneNode(true);
        if (!clonedMenu) return;
        clonedMenu.classList.add("hide--menu");
        function removeEl() {
            clonedMenu.removeEventListener("animationend", removeEl)
            clonedMenu.remove();
        }
        clonedMenu.addEventListener("animationend", removeEl);
        parentMenu?.append(clonedMenu);
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.select}>
                <Select 
                options={options} 
                isSearchable={false}
                isDisabled={ isLoading || !messages.length }
                placeholder="Сортировка по..."
                onChange={changeHandler}
                className="react-select-container"
                classNamePrefix="react-select"
                onMenuClose={handleCloseMenu}
                defaultValue={ options.find(el => el.value === mode ) }
                components={{
                    Menu: (props) => <components.Menu {...props} className="menu--select" />
                }}
                />
            </div>
        </div>
    )
}

export default React.memo(Filter);
