from urllib import response
from flask import Flask, request, session
from flask_session import Session
from flask_cors import CORS, cross_origin
import json

key_config = open('config.json', 'r')

app = Flask(__name__)
cors = CORS(app)
SECRET_KEY = json.load(key_config)['SECRET_KEY']
SESSION_TYPE = 'filesystem'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(__name__)
Session(app)

key_config.close()

@app.route('/signin', methods = ['POST'])
@cross_origin(supports_credentials=True)
def sign_in():
    content_type = request.headers.get('Content-Type')
    # Check if send value is a json
    if content_type == 'application/json':
        username = request.json['username']
        pubkey = request.json['pubkey']
        session['username'] = username
        session['pubkey'] = pubkey
        print(session)
        return {'status': "Success" }
    else:
        return {'status': "Content type not supported" }

@app.route('/getuser', methods = ['GET'])
@cross_origin(supports_credentials=True)
def get_user():
    print(session)
    return {'username': session['username'], 'pubkey': session['pubkey'] }

app.run()

