from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect
from flask_cors import CORS
from config import Config

# Initialize the app
app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize CSRF protection
csrf = CSRFProtect(app)

# Initialize the database and migration
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Initialize JWT
jwt = JWTManager(app)

# Import routes and models
from app import routes, models

