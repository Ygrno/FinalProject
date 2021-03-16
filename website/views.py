from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/system')
def home():
    return render_template("system.html")

@views.route('/notifications')
def notifications():
    return render_template("Notifications.html")

@views.route('/profile')
def profile():
    return render_template("profile.html")
