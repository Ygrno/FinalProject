
export function CreatejsonResponse(is_error, message, json_data) {
    return ({
        "is_error": is_error,
        "Message": message,
        "Data": json_data,

    });
};

export function prepareContactData(api, contact_data) {
    return {
        "API_KEY": api,
        "contact": contact_data
    }
}