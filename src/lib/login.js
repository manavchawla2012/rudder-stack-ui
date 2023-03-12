import Cookies from 'cookies'
import {serverRedirect} from "./redirect";

const verifyToken = async (token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        headers: {
            'authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }).then((_) => {
        return true
    }).catch(_ => {
        return false
    })
}

const checkAuthenticationServerSide = async (context) => {
    // function to check auth server side
    const redirect_save_url = [
        '/login'
    ]
    const cookies = new Cookies(context.req, context.res);
    const page_url = context.resolvedUrl.split(/[?#]/)[0];
    const token = cookies.get("token")
    let token_verified = false
    if (token) {
        token_verified = await verifyToken(token)
        if (!token_verified) {
            cookies.set("token")
        }
    }
    if (redirect_save_url.includes(page_url)) {
        if (token_verified) {
            serverRedirect(context, "/")
        }
    } else {
        if (!token_verified) {
            serverRedirect(context, "/login")
        }
    }
}


export {checkAuthenticationServerSide}
