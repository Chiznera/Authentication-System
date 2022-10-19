"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

# app = Flask(__name__)

# app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# jwt = JWTManager(app)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


    
@api.route('/signup/', methods=['POST'])
def handle_signup():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if email is None:
        return jsonify(
            {'msg': 'No valid email provided.'}
        ), 400
    
    if password is None:
        return jsonify(
            {'msg': 'No valid password provided.'}
        ), 400
    check_user = User.query.filter_by(email = email).first()
   
    if check_user:
        return jsonify(
            {'msg': 'User already exist.'}
        ), 409

    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()

    payload = {
        'msg': 'User creation successful.', 'user': user.serialize()
    }

    return jsonify(payload), 200


@api.route('/login/', methods=['POST'])
def handle_login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify(
            {'msg': 'User does not exist.'}
        ), 404
    
    if password != user.password:
        return jsonify(
            {'msg': 'Incorrect password.'}
        ), 401

    access_token = create_access_token(identity=email)
   

    payload = {
        'access_token': access_token
    }

    return jsonify(payload), 200