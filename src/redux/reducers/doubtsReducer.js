import {ADD_DOUBT, GET_ALL_DOUBTS} from "../type/doubtsType";

const initState = {
    doubts: []
}

const setDoubts = (state, action) => {
    return ({
        ...state,
        doubts: action.doubts
    })
}

const addDoubt = (state, action) => {
    const doubt = action.doubt
    if(doubt){
        console.log(doubt, "===")
        return({
            ...state,
            doubts: [doubt, ...state.doubts]
        })
    }else{
        return state
    }
}


const doubtReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_DOUBTS: return setDoubts(state, action)
        case ADD_DOUBT: return addDoubt(state, action)
        default: {
            return state
        }
    }
}

export default doubtReducer

