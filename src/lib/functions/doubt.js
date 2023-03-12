import axios from "../axios";

const getQnA = (doubt_id) => {
    return axios.get(`/doubt/qna?doubt=${doubt_id}`).then(res=>{
        return res.data
    }).catch(err=>{
        return []
    })
}

export {getQnA}
