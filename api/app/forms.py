from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo

'''
auth forms
including:
    registration
    login
    details reset
'''

'''
registration class form
'''
class RegisterForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired(), Length(min=6, max=12)])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message='Passwords must match')])
    submit = SubmitField('Register')

'''
login class form
'''
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=6, max=12)])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

'''
resert uername class form
'''
class ResetUsernameForm(FlaskForm):
    new_username = StringField('New Username', validators=[DataRequired(), Length(min=6, max=12)])
    submit = SubmitField('Reset Username')

'''
reset email class form
'''
class ResetEmailForm(FlaskForm):
    new_email = StringField('New Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Reset Email')

'''
reset password class form
'''
class ResetPasswordForm(FlaskForm):
    new_password = PasswordField('New Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm New Password', validators=[DataRequired(), EqualTo('new_password', message='Passwords must match')])
    submit = SubmitField('Reset Password')

'''end of auth forms'''

'''
Data entry forms
includes:
    catagory class form for inputin CategoryForm
    journal class form for data entry
'''

'''category class form'''
class CategoryForm(FlaskForm):
    category = StringField('Category', validators=[DataRequired()])

'''journal form class'''
class JournalEntryForm(FlaskForm)


