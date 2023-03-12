import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";


export default function store(){
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
}
