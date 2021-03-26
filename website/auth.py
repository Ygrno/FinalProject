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
    if request.method=='POST':
        data = request.get_json()
        s = requests.session()
        payload = {
            'openid_identifier':'', 
            'name': data['username'],
            'pass': data['password'],
            'form_build_id': 'form-jtUWNHRMwAFH5flsQlSCsx172PKrfkz074NM-b3aKK0',
            'form_id': 'user_login_block',
            'openid.return_to': 'http://18.212.23.161/openid/authenticate?destination=node',
            'op': 'Log in'   
         }
        response = requests.post("http://18.212.23.161/node?destination=node",data=payload)
        content = str(response.content)
        found = content.find("logout")
        if found > -1:
            return {
                'id': '205'
            } 
        
        else:
            return {
                'id': '305'
            }

    return {
        'id': '200'
    }

@auth.route('/logout')
def logout():
    return


@auth.route('/sign-up', methods=['Get', 'POST'])
def sign_up():
    # data = all_contacts()
    # response = "!"
    if request.method=='POST':
        firstname = request.form['FirstName']
        lastname = request.form['LastName']
        username = request.form['UserName']
        password = request.form['Password']
        email = request.form['Email']
        s = requests.session()
        payload = {
            'name': username,
            'mail': email,
            'pass[pass1]': password,
            'pass[pass2]': password,
            'timezone': 'UTC',
            'form_build_id': 'form-7SeLQZEkV5pm10DsgG7vfs5W2jjozMauDn0c_cm1HXQ',
            'form_id': 'user_register_form',
            '_qf_default': 'Dynamic:upload',
            'MAX_FILE_SIZE': '83886080',
            'edit[civicrm_dummy_field]': 'CiviCRM Dummy Field for Drupal',
            'gid': '',
            'first_name': firstname,
            'last_name': lastname,
            'street_address-1': '',
            'city-1': '',
            'postal_code-1:': '',
            'country-1': '',
            'op': 'Create new account'   
         }
        response = requests.post("http://18.212.23.161/user/register",data=payload)
        content = str(response.content)
        print('*******************')
        print(content)
        print('*******************')
        # found = content.find("logout")
        # if found > -1:
        #     return redirect(url_for("views.home"))
        
        # else:
        #     return render_template("login.html", text='Error: Invalid Username / Password')


    return render_template("sign-up.html")