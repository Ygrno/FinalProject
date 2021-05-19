import axios from "axios";

const config = {
    headers: {'Content-Type': 'application/json'}
};

const client = axios.create(config);

const updateUrl = "http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?";

const siteKey = "aacce8033f7a9730040b45df047e3191"

export const getAllContributions = (api_key) => {
    var urlParams = `entity=Contribution&action=get&json={sequential:1,"options":{"limit":1000}}&api_key=${api_key}&key=${siteKey}`;
    return client.get(`${updateUrl}${urlParams}`)
};

export const addContributions = (api_key, financial_type_id, receive_date, total_amount, contact_id) => {
    var urlParams = `entity=Contribution&action=create&json={"financial_type_id":${financial_type_id},"receive_date":${receive_date},"total_amount":${total_amount},"contact_id":${contact_id}&api_key=${api_key}&key=${siteKey}`;
    return client.post(`${updateUrl}${urlParams}`)
};