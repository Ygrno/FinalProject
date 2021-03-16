from flask import Blueprint, render_template, request, jsonify, redirect, url_for
import requests
import json

URL = "http://18.212.23.161//modules/contrib/civicrm/extern/rest.php?"
API_KEY = 'ErRgqZungnzKzkRY'
SITE_KEY = 'b9db4efb6d32f3eea0b37157058c9a25'

auth = Blueprint('auth', __name__)

def all_contacts():
    val = {
    "entity": "Contact",
    "action": "get",
    "json": {
        "sequential":1,
    }
    }
    return val

@auth.route('/', methods=['Get', 'POST'])
def login():
    data = all_contacts()
    response = "!"

    if request.method=='POST':

        username = request.form['UserName']
        password = request.form['Password']

        payload = {
            "entity": data['entity'],
            'action': data['action'],
            'api_key': API_KEY,
            'key': SITE_KEY,
            'json': json.dumps(data.get('json'))
        }
        response = requests.post(url=URL, params=payload)
        response_json = response.json()
        found = False
        for person in response_json['values']:
            if person['contact_type'] == username and person['contact_id'] == password:
                found = True
                break
        if found:
            return redirect(url_for("views.home"))

    return render_template("login.html")

@auth.route('/logout')
def logout():
    return "<h1> logout </h1>"

@auth.route('/sign-up')
def sign_up():
    return render_template("sign-up.html")