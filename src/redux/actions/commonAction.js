import {LOADER} from "../type/commonType";

export const setLoader = (state=false) => {
    return dispatch => {
        return dispatch({
            type: LOADER,
            loader: state
        })
    }
}

