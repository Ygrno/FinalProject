const axios = require('axios').default;

axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/',
    data: {
        username: 'user',
        password: 'Aa123456'
    }
}).then(function (response){
    console.log(response)
});