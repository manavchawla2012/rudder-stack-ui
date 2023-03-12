import {LOADER} from "../type/commonType";

const initState = {
    loader: false
}

const setLoader = (state, action) => {
    return ({
        ...state,
        loader: action.loader
    })
}


const commonReducer = (state = initState, action) => {
    switch (action.type) {
        case LOADER: return setLoader(state, action)
        default: {
            return state
        }
    }
}

export default commonReducer
