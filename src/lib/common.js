import moment from "moment";

export const showErrorMessageFromAxios = (err, default_message = "") => {
    const error_msg_data = err ? err.data : null
    let error_msg = default_message
    if (error_msg_data) {
        let errors = error_msg_data
        const values = []
        if (typeof errors !== "string") {
            if (typeof errors === "object") {
                for (const key of Object.keys(errors)) {
                    values.push(errors[key])
                }
            }
            while (values.length !== 0) {
                const value = values.pop()
                if (typeof value === "object") {
                    for (const key of Object.keys(value)) {
                        values.push(value[key])
                    }
                } else if (typeof value === "string") {
                    error_msg = value
                    break
                } else {
                    break
                }
            }
        } else {
            error_msg = errors
        }
    }
    //setErrorSuccessMessage({error: error_msg})
    //showLoader(false)
    return error_msg
}


export const convertDate = (date_string) => {
    const moment_object = moment(date_string)
    return moment_object.format("MMM Do, h:mm A")
}
