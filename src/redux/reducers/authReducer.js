import {USER_LOGIN, USER_LOGOUT, USER_DETAILS} from "../type/authType"

const initState = {
    user_key: null,
    user_details: {}
}

const login = (state, action) => {
    return {
        ...state,
        user_key: action.user_key
    }
}

const userDetails = (state, action) => {
    return {
        ...state,
        user_details: action.user_details
    }
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOGIN: return login(state, action)
        case USER_DETAILS: return userDetails(state, action)
        default: {
            return state
        }
    }


}

export default authReducer
