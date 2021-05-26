import axios from "axios";

const config = {
    headers: {'Content-Type': 'application/json'}
};

const client = axios.create(config);

const updateUrl = "http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?";

const site_key = "aacce8033f7a9730040b45df047e3191";

export const updateContact = (email, api_key) => {
    var urlParams = `entity=Contact&action=get&json={sequential:1,email:${email}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllSoldiers = (api_key) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_sub_type":"Soldier"}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllPendingSoldiers = (api_key) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_sub_type":"Pending"}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getProfile = (api_key, contact_id) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_id":${contact_id}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getProfilewithAddres = (api_key, contact_id) => {
    var urlParams = `entity=Contact&action=get&json={"sequential":1, "contact_id":${contact_id}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};


export const setActiveEvent = (api_key, application_id) => {
    var urlParams = `entity=Event&action=create&json={"id":${application_id},"options":{"limit":300},"is_active":1}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const setConfirmEvent = (api_key, application_id) => {
    var urlParams = `entity=Event&action=create&json={"id":${application_id},"options":{"limit":300},"is_confirm_enabled":1}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const addParticipantToEvent = (api_key, application_id, contact_id) => {
    var urlParams = `entity=Participant&action=create&json={"event_id":${application_id},"contact_id":${contact_id}}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const getAllContactsEvent = (api_key, contact_id) => {
    var urlParams = `entity=Participant&action=get&json={"sequential":1, "contact_id":${contact_id}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllSoldierEvents = (api_key, contact_id) => {
    var urlParams = `entity=Event&action=get&json={"sequential":1, "created_id":${contact_id}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllEvents = (api_key) => {
    var urlParams = `entity=Event&action=get&json={"sequential":1, "options":{"limit":500,"sort":"created_date desc"}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getAllUnconfirmEvents = (api_key) => {
    var urlParams = `entity=Event&action=get&json={"sequential":1,"is_confirm_enabled":0, "is_active":1, "options":{"limit":300}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const sendApplication = (api_key, event_type, event_title, event_description, summary, today) => {
    var urlParams = `entity=Event&action=create&json={"event_type_id":\"${event_type}\","default_role_id":\"Soldier\","participant_listing_id":\"Name and Email\","title":\"${event_title}\","summary":\"${summary}\","description":\"${event_description}\","start_date":\"${today}\","is_active":\"0\", "is_confirm_enabled":0, "max_additional_participants":\"2\"}&api_key=${api_key}&key=${site_key}`;
    console.log("event_type", today)
    return client.post(`${updateUrl}${urlParams}`)
};

export const getAllPendings = (api_key) => {
    console.log("service api key", api_key)
    var urlParams = `entity=Contact&action=get&json={"sequential":1,"return":\"display_name,id,email,first_name,last_name,image_URL\","contact_sub_type":\"Pending","options\":{"limit":300}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const removePending = (api_key, contact_id, subtype) => {
    var urlParams = `entity=Contact&action=create&json={"id":\"${contact_id}\","contact_sub_type":\"${subtype}\"}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const updateProfileContact = (api_key, contact_id, firstName, lastName) => {
    var urlParams = `entity=Contact&action=create&json={"id":\"${contact_id}\","first_name":\"${firstName}\","last_name":\"${lastName}\"}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const updateProfileAddress = (api_key, address_id, city, street, number) => {
    var urlParams = `entity=Address&action=create&json={"id":\"${address_id}\","city":\"${city}\","street_name":\"${street}\","street_number":\"${number}\"}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const sendMail = (api_key, contact_id_to_send, template_id) => {
    var urlParams = `entity=Email&action=send&json={"contact_id":${contact_id_to_send},"template_id":${template_id}}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
}

export const getEventParticipantsContact = (api_key, event_id) => {
    var urlParams = `entity=Participant&action=get&json={"sequential":1,"event_id":${event_id}}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const getContactAddress = (api_key, contact_id) => {
    var urlParams = `entity=Address&action=get&json={"sequential":1,"contact_id":${contact_id},"return":"street_name,street_number,city"}&api_key=${api_key}&key=${site_key}`;
    return client.get(`${updateUrl}${urlParams}`)
};


export const CreateTemplate = (api_key,msg_text, msg_html ) => {
    var urlParams = `entity=MessageTemplate&action=Create&json={"msg_title":"Application Details","msg_subject":"Confirmation and application details","msg_text":\"${msg_text}\","msg_html":\"${msg_html}\","is_active":1}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};

export const DeleteTemplate = (api_key,id) => {
    var urlParams = `entity=MessageTemplate&action=delete&json={"id":\"${id}\"}&api_key=${api_key}&key=${site_key}`;
    return client.post(`${updateUrl}${urlParams}`)
};




export const serachContacts = (search_data, api_key) => {
    var urlParams = new URLSearchParams({
        'entity': 'Contact',
        'action': 'get',
        'json': JSON.stringify({
            "sequential": 1, "id": search_data.contact_id,
            "email": search_data.email, "contact_type": search_data.contact_type,
            "first_name": search_data.first_name, "last_name": search_data.last_name
        }),
        'api_key': api_key,
        'key': 'aacce8033f7a9730040b45df047e3191'
    })
    return client.get(`${updateUrl}${urlParams}`)
}

