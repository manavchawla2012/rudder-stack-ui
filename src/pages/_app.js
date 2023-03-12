import '../../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss'
import {Provider} from 'react-redux';
import withReduxStore from "../lib/with-redux-store"
import {useEffect} from "react";

function MyApp({Component, pageProps, store}) {
    useEffect(()=>{
        return store.dispatch
    }, [])
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}


export default withReduxStore(MyApp)
