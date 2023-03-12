import React from 'react';
import {Cookies} from "react-cookie"
import ServerCookies from "cookies";

export const clientRedirect = (redirect_url, login_direct=false) => {
    const cookie = new Cookies()
    const cookie_redirect_url = cookie.get("redirect-url")
    if (cookie_redirect_url && !login_direct){
        if(!login_direct) {
            cookie.remove("redirect-url")
        }
        window.location.href = decodeURIComponent(cookie_redirect_url)
    }else {
        window.location.href = redirect_url
    }
}

export const serverRedirect = (ctx, redirect_url, permanent=false) => {
    const res = ctx.res;
    const cookies = new ServerCookies(ctx.req, res);
    const cookie_redirect_url = cookies.get("redirect-url")
    if (cookie_redirect_url){
        cookies.set("redirect-url")
        res.setHeader('Location', decodeURIComponent(cookie_redirect_url))
    }else{
        res.setHeader('Location', decodeURIComponent(redirect_url))
    }
    res.statusCode = permanent ? 301 : 307
};
