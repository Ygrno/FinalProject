const user_name = document.getElementById('UserName')
const password = document.getElementById('Password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

class User {
    constructor(username, password, isVolunteer)
    {
        this.username = username
        this.password = password
        this.isVolunteer = isVolunteer
    }
}

let users = [new User("Roni", "Aa123456", true),new User("Ronit", "Aa123456", false)]

form.addEventListener('submit', (e) => {
    e.preventDefault()


    let i = 0
    let found = false
    let j = 0;
    for(i = 0; i < users.length && !found; i++)
    {
        if(users[i].username === user_name.value && users[i].password === password.value){
            found = true
            j = i
        }
    }

    if(found) 
    {
        if(users[j].username === "Ronit") window.location = "../pagesnit/system.html"
        if(users[j].username === "Roni") window.location = "../pages/system.html"


    }
    
    else{
        errorElement.innerText = "Incorrect Username / Password"
    }

    
})







