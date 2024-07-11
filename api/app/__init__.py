from flask import Flask, request, jsonify, session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config



'''
app and database migrations
'''
app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
from flask_cors import CORS
CORS(app)
'''..............'''
csrf = CSRFProtect(app)
db =  SQLAlchemy(app)
migrate = Migrate(app, db)

'''auth functions'''
jwt = JWTManager(app)

from app import routes, models
