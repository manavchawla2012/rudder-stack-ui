import moment from "moment";

export const showErrorMessageFromAxios = (err, default_message = "") => {
    const error_msg_data = err ? err.data : null
    let error_msg = default_message
    if (error_msg_data) {
        error_msg = error_msg_data.error.message
    }
    return error_msg
}


export const convertDate = (date_string) => {
    const moment_object = moment(date_string)
    return moment_object.format("MMM Do, h:mm A")
}
