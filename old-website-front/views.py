from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/system')
def home():
    return 'to do ...'

@views.route('/notifications')
def notifications():
    return 'to do ...'

@views.route('/profile')
def profile():
    return 'to do ...'
