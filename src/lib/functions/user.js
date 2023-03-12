import axios from "../axios";


const getUserDetails = (user_id) => {
    return axios.get(`/users/${user_id}`).then(res=>{
        return res.data
    }).catch(err=>{
        return {}
    })
}

export {getUserDetails}
