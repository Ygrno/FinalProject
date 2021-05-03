import axios from "axios";

const config = {
    headers: { 'Content-Type': 'application/json' }
};

const client = axios.create(config);

const updateUrl = "http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?";

export const updateContact = (email, api_key) => {
    var urlParams = `entity=Contact&action=get&json={\"sequential\":1,\"email\":\"${email}\"}&api_key=${api_key}&key=aacce8033f7a9730040b45df047e3191`;
    return client.get(`${updateUrl}${urlParams}`)
};

