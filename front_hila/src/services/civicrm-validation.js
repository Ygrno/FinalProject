var axios = require('axios');

const globals = {
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
                            "first_name": search_data.first_name, "last_name": search_data.last_name, "options": {"limit":""}}),
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
        
        temp = response.data;
        check = true;
        for(i = 0; i < temp.values.length; i++){
            email_i = temp.values[i].email;
            for(j = 0; j < temp.values.length; j++){
                if(j != i){
                    email_j = temp.values[j].email;
                    if(email_j == email_i && email_j != '' && email_j != 'sprint21@gmail.com'){
                        console.log('Failed');
                        console.log(email_j)
                        check = false;
                        break;
                    }

                }
            }
        }
        if(check) console.log('Success')

        // console.log(temp)
        
    })
    .catch(function(error){
        console.log(error)
    
    });
}

const search_data = {
    contact_id: '',
    email: '',
    contact_type: '',
    first_name: '',
    last_name: '',
}

search_contacts(globals.API_KEY, search_data)




