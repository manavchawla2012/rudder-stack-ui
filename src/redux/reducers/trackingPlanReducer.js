import {ADD_TRACKING_PLAN, GET_ALL_TRACKING_PLANS} from "../type/trackingPlan";

const initState = {
    trackingPlans: []
}

const setTrackingPlan = (state, action) => {
    return ({
        ...state,
        trackingPlans: action.trackingPlans
    })
}

const addDoubt = (state, action) => {
    const trackingPlans = action.trackingPlans
    if (trackingPlans) {
        return ({
            ...state,
            trackingPlans: [trackingPlans, ...state.trackingPlans]
        })
    } else {
        return state
    }
}


const trackingPlanReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_TRACKING_PLANS:
            return setTrackingPlan(state, action)
        case ADD_TRACKING_PLAN:
            return addDoubt(state, action)
        default: {
            return state
        }
    }
}

export default trackingPlanReducer

