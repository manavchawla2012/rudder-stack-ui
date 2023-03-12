import {GET_ALL_DOUBTS, ADD_DOUBT} from "../type/doubtsType";
import {LOADER} from "../type/commonType";
import axios from "../../lib/axios";
import {showErrorMessageFromAxios} from "../../lib/common";

export const getAllDoubtsAction = () => {
    return async (dispatch) => {
        const doubts = await axios.get("/doubt/").then(res => {
            return res.data
        }).catch(err => {

            return []
        })
        dispatch({
            type: GET_ALL_DOUBTS,
            doubts: doubts
        })
    }
}

export const addDoubtAction = (data, setDisabled) => {
    return async(dispatch) => {
        const doubt = await axios.post("/doubt/", data).then(res => {
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
            const error = showErrorMessageFromAxios(err, "Some Error Occurred...")
            alert(error)
            return null
        })
        return dispatch({
            type: ADD_DOUBT,
            doubt: doubt
        })
    }
}
