const user_name = document.getElementById('UserName')
const password = document.getElementById('Password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
// const axios = require('axios').default;

form.addEventListener('submit', (e) => {
    e.preventDefault()

    config = {
        method: 'post',
        url: 'http://127.0.0.1:5000/',
        data: {
            username: user_name.value,
            password: password.value
        }
    }

    axios(config).then(function (response){
        r = response['data']['id']

        if(r == '205') 
        {
            console.log('success-login')
            window.location = '../pages/system.html'    
        }  
        else{
            errorElement.innerText = "Incorrect Username / Password"
        }
    })
    .catch(function(error) {
        errorElement.innerText = "Problem Connecting to Server"
        console.log('server error')
    });
})







