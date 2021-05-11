import axios from "axios";

const config = {
    headers: { 'Content-Type': 'application/json' }
};

const client = axios.create(config);

const updateUrl = "http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?";

export const updateContact = (email, api_key) => {
    var urlParams = `entity=Contact&action=get&json={sequential:1,email:${email}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllSoldiers = (api_key) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_sub_type":"Soldier"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllPendingSoldiers = (api_key) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_sub_type":"Pending"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getProfile = (api_key) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_id": "296"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};


export const setActiveEvent = (api_key, application_id) => {
    var urlParams = `entity=Event&action=create&json={"id":${application_id},"options":{"limit":300},"is_active":1}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const setConfirmEvent = (api_key, application_id) => {
    var urlParams = `entity=Event&action=create&json={"id":${application_id},"options":{"limit":300},"is_confirm_enabled":1}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const addParticipantToEvent = (api_key, application_id, contact_id) => {
    var urlParams = `entity=Participant&action=create&json={"event_id":${application_id},"contact_id":${contact_id}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const getAllContactsEvent = (api_key, contact_id) => {
    var urlParams = `entity=Participant&action=get&json={"sequential":1, "contact_id":${contact_id}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};
export const getAllEvents = (api_key) => {
    var urlParams = `entity=Event&action=get&json={"sequential":1, "options":{"limit":500}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllUnconfirmEvents = (api_key) => {
    var urlParams = `entity=Event&action=get&json={"sequential":1,"is_confirm_enabled":0,"options":{"limit":300}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const sendApplication = (api_key,event_type, event_title,event_description,today) => {
    var urlParams = `entity=Event&action=create&json={"event_type_id":\"${event_type}\","default_role_id":\"Soldier\","participant_listing_id":\"Name and Email\","title":\"${event_title}\","description":\"${event_description}\","start_date":\"${today}\","is_active":\"0\", "is_confirm_enabled":0, "max_additional_participants":\"2\"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    console.log("event_type", today)
    return client.post(`${updateUrl}${urlParams}`)
};


export const getAllPendings = (api_key) => {
    console.log("service api key",api_key)
    var urlParams = `entity=Contact&action=get&json={"sequential":1,"return":\"display_name,id,email,first_name,last_name,image_URL\","contact_sub_type":\"Pending","options\":{"limit":300}}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
}
export const removePending = (api_key,contact_id) =>{
    var urlParams = `entity=Contact&action=create&json={"id":\"${contact_id}\","contact_sub_type":\"Soldier\"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.post(`${updateUrl}${urlParams}`)
}