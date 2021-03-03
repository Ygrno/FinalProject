const sign_up = document.getElementById('sign-up')
const form = document.getElementById('form')

class User {
    constructor(username, password, isVolunteer)
    {
        this.username = username
        this.password = password
        this.isVolunteer = isVolunteer
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.innerHTML = "<form id = \"form\" class=\"sign-up-form\"> <img src=\"../images/Icon.png\"><h1> ההרשמה הסתיימה בהצלחה </h1><h2> נציג מטעם העמותה יבחן את הפרטים וישלח אישור חשבון לכתובת המייל </h2><p> יש לך כבר חשבון ? <a href=\"login.html\">  כנס כאן  </a></form>"

})

