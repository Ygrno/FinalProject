var axios = require('axios');

globals = {
    URL: "http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?", 
    SITE_KEY: "aacce8033f7a9730040b45df047e3191",
    API_KEY: "qtjrB1QzwvBIhMVcPcT3Nw" //For Testing purposes //TODO: Delete
}

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
function search_contacts(api_key, search_data){
    params = new URLSearchParams({
        'entity': 'Contact',
        'action': 'get',
        'json': JSON.stringify({"sequential": 1,"id": search_data.contact_id,
                            "email": search_data.email, "contact_type": search_data.contact_type, 
                            "first_name": search_data.first_name, "last_name": search_data.last_name}),
        'api_key': api_key,
        'key': globals.SITE_KEY
    }).toString();

    config = {
        method: 'get',
        url: globals.URL + params,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config).then(function(response){
        console.log(response.data)
    })
    .catch(function(error){
        console.log(error)
    
    });
}

/*
Update works exctly like search, though this time its for updating data of *specific* user,
contact id or email must be included in the search data.

example:
let search_data = {
    contact_id: 61,
    email: '',
    // first 2 lines above are for finding the contact record in the DB, the rest is what will be changed:
    contact_type: '',
    first_name: Dan,
    last_name: '',
}

the Input above will update the first name field of contact id:61 to be Dan.
*/
function update_contact_record(api_key, search_data){

if (search_data.contact_id == "" && search_data.email == "")
    return "no contact id or email";

    params = new URLSearchParams({
        'entity': 'Contact',
        'action': 'create',
        'json': JSON.stringify({"sequential": 1,"id": search_data.contact_id,
                            "email": search_data.email, "contact_type": search_data.contact_type, 
                            "first_name": search_data.first_name, "last_name": search_data.last_name}),
        'api_key': api_key,
        'key': globals.SITE_KEY
    }).toString();

    config = {
        method: 'post',
        url: globals.URL + params,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config).then(function(response){
        console.log(response.data)
    })
    .catch(function(error){
        console.log(error)
    });
}


//Call Example:

// let search_data = {
//     contact_id: 51,
//     email: '',
//     contact_type: '',
//     first_name: 'Dan',
//     last_name: '',
// }

// update_contact_record(globals.API_KEY, search_data)

// export {search_contacts, update_contact_record}
