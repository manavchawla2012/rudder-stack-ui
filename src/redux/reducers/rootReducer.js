import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import doubtReducer from "./doubtsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    common: commonReducer,
    doubt: doubtReducer
});

export default rootReducer;
