import axios from "axios";
import {serverRedirect} from "./redirect";
import Cookies from 'cookies'
import {showErrorMessageFromAxios} from "./common";

const axiosInstance = (context) => {
    const cookies = new Cookies(context.req, context.res);
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    instance.interceptors.request.use(req => {
            const user_token = cookies.get("token")
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
                cookies.set('token')
                serverRedirect(context, `/login?error=${showErrorMessageFromAxios(error, "Please Login Again...")}`)
            }
        }
        throw error
    })
    return instance
}

export default axiosInstance
