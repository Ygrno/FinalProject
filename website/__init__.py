from flask import Flask
from flask_cors import CORS, cross_origin

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['Secret_Key'] = 'secret'

    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    return app