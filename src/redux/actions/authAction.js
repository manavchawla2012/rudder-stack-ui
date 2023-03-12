import axios from "../../lib/axios";
import {clientRedirect} from "../../lib/redirect";
import {USER_DETAILS, USER_LOGIN, USER_LOGOUT} from "../type/authType";
import {Cookies} from "react-cookie"
import {showErrorMessageFromAxios} from "../../lib/common";

export const getUserDetailsAction = () => {
    return dispatch => {
        axios.get("/users/details").then(res => {
            dispatch({
                type: USER_DETAILS,
                user_details: res.data
            })
        }).catch(err => {
            const response = err.response
            let url = "/login"
            if (response) {
                const response_keys = response.keys
                url += `?error=${response[response_keys[0]]}`
            }
           clientRedirect(url)
        })
    }
}

export const loginAction = (user_name, password) => {
    return dispatch => {
        axios.post("/authenticate/login", {
            "username": user_name,
            "password": password
        }).then(res => {
            const cookies = new Cookies()
            const token = res.data.token
            dispatch({
                type: USER_LOGIN,
                user_key: token
            })
            cookies.set('token', token)
            clientRedirect("/")
        }).catch(err => {
            const response = err.data
            let url = "/login"
            if (response) {
                url += `?error=${showErrorMessageFromAxios(err, "Please Refresh the page...")}`
            }
            clientRedirect(url)
        })
    }
}

export const logoutAction = () =>{
    return async (dispatch) => {
        const api_resp = await axios.post("/authenticate/logout")
        const cookies = new Cookies()
        cookies.remove('token')
        dispatch({
            type: USER_LOGOUT
        })
        clientRedirect("/")
    }
}
