import axios from "axios";
import {clientRedirect} from "./redirect";
import {Cookies} from "react-cookie"
import {showErrorMessageFromAxios} from "./common";

const instance = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
})

instance.interceptors.request.use(req => {
        const cookie = new Cookies()
        const user_token = cookie.get("token")
        req.headers["Authorization"] = "Token " + user_token
        return req
    },
    error => {
        throw error
    }
)

instance.interceptors.response.use(res => {
    return res
}, error => {
    if (error.response) {
        const status_code = error.response.status;
        if (status_code === 401) {
            clientRedirect(`/login?error=${showErrorMessageFromAxios(error, "Please Login Again...")}`)
        }
    }
    throw error.response
})


export default instance
