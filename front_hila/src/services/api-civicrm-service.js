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

/*
Input: User's API-Key and Search Data
Search Data should look like this:

let search_data = {
    contact_id: '',
    email: '',
    contact_type: '',
    first_name: '',
    last_name: '',
}

For a full search of all contacts the user can see - 
leave all the fields blank (empty string, like in the example above)
Filling the Contact ID / Email fields should return only 1 record from the DB.

Using an API-Key of a user that isn't administrator (like Soldiers, volunteers)
should return only 1 Record at most (which is the user's own data - usful for profile)

--------------------------------------------------------------------------------------------

Output: JSON:
{
    is_error:,
    version:,
    count:,
    //OPTIONAL (ID, CONTACT_TYPE .... (the input fields themselves))
    values: [{},{},{}] //The Actual results of the people that were found
}

Wrong or Problomatic input will return the civicrm error message explaining what was wrong.
*/
export const serachContacts = (search_data, api_key) => {
    var urlParams = new URLSearchParams({
        'entity': 'Contact',
        'action': 'get',
        'json': JSON.stringify({"sequential": 1,"id": search_data.contact_id,
                            "email": search_data.email, "contact_type": search_data.contact_type, 
                            "first_name": search_data.first_name, "last_name": search_data.last_name}),
        'api_key': api_key,
        'key': 'aacce8033f7a9730040b45df047e3191'
    })
    return client.get(`${updateUrl}${urlParams}`)
}

