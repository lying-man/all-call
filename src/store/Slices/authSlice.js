import { createSlice } from "@reduxjs/toolkit";
import { showNotice } from "./noticeSlice";

const initialState = {
    isAuth: false,
    name: null,
    isAuthentification: false,
    loginError: {
        user: null,
        password: null
    },
    registerError: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = true;
            state.name = action.payload.user
        },
        setIsAuthentification(state, action) {
            state.isAuthentification = action.payload.mode;
        },
        setErrorRegister(state, action) {
            state.registerError = action.payload.error;
        },
        setErrorLogin(state, action) {
            
            if (action.payload.type === "errorName") {
                state.loginError.user = action.payload.error;
                return;
            }

            if (action.payload.type === "errorPass") {
                state.loginError.password = action.payload.error;
                return;
            }

            if (action.payload.type === "reset") {
                state.loginError = { user: null, password: null }
            }

        },
        unlogin(state, action) {
            state.isAuth = false;
            state.name = null;
        }
    }
});

const { 
    setAuth, 
    setIsAuthentification,
    setErrorRegister,
    setErrorLogin,
    unlogin
} = authSlice.actions;

//thunks

//login thunk
const loginUser = (name, pass, navigate) => {
    return async (dispatch) => {

        dispatch(setIsAuthentification({mode: true}));

        try {

            let response = await fetch("https://call-app.openode.dev/auth/login", {
                method: "POST",
                body: JSON.stringify({ name, pass }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "no-cors"
                }
            });
            let data = await response.json();

            if (data.errorName) {
                dispatch(setErrorLogin({ type: "errorName", error: data.errorName }));
                return;
            }

            if (data.errorPass) {
                dispatch(setErrorLogin({ type: "errorPass", error: data.errorPass }));
                return;
            }

            navigate("/", { replace: true });
            dispatch(setAuth({ user: name }));
            dispatch(showNotice({ text: "Вы успешно вошли в приложение", mode: "success" }));

        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsAuthentification({mode: false}));
        }

    }
}

//register thunk
const registerUser = (name, pass, navigate) => {
    return async (dispatch) => {

        dispatch(setIsAuthentification({mode: true}));

        try {
            let response = await fetch("https://call-app.openode.dev/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, pass }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "no-cors"
                }
            });
            let data = await response.json();

            if (data.error) {
                dispatch(setErrorRegister({ error: data.error }));
                return;
            }

            navigate("/", { replace: true });
            dispatch(setAuth({ user: name }));
            dispatch(showNotice({ text: "Вы успешно вошли в приложение", mode: "success" }));

        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsAuthentification({mode: false}));
        }

    }
}

export { setAuth, registerUser, setErrorRegister, loginUser, setErrorLogin, unlogin }
export default authSlice.reducer;
