from flask import Flask, jsonify, request, render_template, Blueprint
import requests
import json


URL = "http://18.212.23.161//modules/contrib/civicrm/extern/rest.php?"

API_KEY = 'ErRgqZungnzKzkRY'
SITE_KEY = 'b9db4efb6d32f3eea0b37157058c9a25'

app = Flask(__name__)
# auth = Blueprint('auth',__name__)

@app.route('/')
def hello_world():
    data = request.get_json()

    payload = {
        "entity": data['entity'],
        'action': data['action'],
        'api_key': API_KEY,
        'key': SITE_KEY,
        'json': json.dumps(data.get('json'))
    }

    response = requests.post(url=URL, params=payload)
    return response.json()


if __name__ == '__main__':
    app.run(debug=True)