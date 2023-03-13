import {GET_ALL_TRACKING_PLANS, ADD_TRACKING_PLAN} from "../type/trackingPlan";
import {LOADER} from "../type/commonType";
import axios from "../../lib/axios";
import {showErrorMessageFromAxios} from "../../lib/common";

export const getAllTrackingPlans = () => {
    return async (dispatch) => {
        const trackingPlans = await axios.get("/tracking-console/tracking-plan").then(res => {
            return res.data
        }).catch(err => {
            throw err
        })
        dispatch({
            type: GET_ALL_TRACKING_PLANS,
            trackingPlans: trackingPlans
        })
    }
}

export const addTrackingPlan = (data, setDisabled) => {
    return async (dispatch) => {
        const trackingPlans = await axios.post("/tracking-console/tracking-plan", data).then(res => {
            dispatch({
                type: LOADER,
                loader: false
            })
            setDisabled(true)
            return res.data
        }).catch(err => {
            dispatch({
                type: LOADER,
                loader: false
            })
            showErrorMessageFromAxios(err, "Some Error Occurred...")
            throw err
        })
        return dispatch({
            type: ADD_TRACKING_PLAN,
            trackingPlans: trackingPlans
        })
    }
}
