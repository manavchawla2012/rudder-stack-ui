import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import trackingPlanReducer from "./trackingPlanReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    common: commonReducer,
    trackingPlan: trackingPlanReducer,
});

export default rootReducer;
