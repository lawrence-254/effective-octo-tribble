from flask import render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, db
from app.forms import RegisterForm, LoginForm, ResetUsernameForm, ResetEmailForm, ResetPasswordForm
from app.models import User
from app.utils import login_required



@app.route('/')
@app.route('/index')
@login_required
def index():
    user = {'username': 'mozart'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        new_user = User(
            username=form.username.data,
            email=form.email.data,
            hashed_password=hashed_password
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! You can now log in.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            flash('Error: User already exists.', 'danger')
            return redirect(url_for('register'))

    return render_template('register.html', title='REGISTER', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('index'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.hashed_password, form.password.data):
            session['user_id'] = user.id
            session['username'] = user.username
            flash('Login successful!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password.', 'danger')

    return render_template('login.html', title='LOGIN', form=form)

@app.route('/logout')
@login_required
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))


@app.route('/reset_username', methods=['GET', 'POST'])
@login_required
def reset_username():
    if 'user_id' not in session:
        flash('You need to be logged in to reset your username.', 'danger')
        return redirect(url_for('login'))

    form = ResetUsernameForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.username = form.new_username.data
        db.session.commit()
        flash('Your username has been updated!', 'success')
        return redirect(url_for('index'))

    return render_template('reset_username.html', title='Reset Username', form=form)

@app.route('/reset_email', methods=['GET', 'POST'])
@login_required
def reset_email():
    if 'user_id' not in session:
        flash('You need to be logged in to reset your email.', 'danger')
        return redirect(url_for('login'))

    form = ResetEmailForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.email = form.new_email.data
        db.session.commit()
        flash('Your email has been updated!', 'success')
        return redirect(url_for('index'))

    return render_template('reset_email.html', title='Reset Email', form=form)

@app.route('/reset_password', methods=['GET', 'POST'])
@login_required
def reset_password():
    if 'user_id' not in session:
        flash('You need to be logged in to reset your password.', 'danger')
        return redirect(url_for('login'))

    form = ResetPasswordForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.hashed_password = generate_password_hash(form.new_password.data)
        db.session.commit()
        flash('Your password has been updated!', 'success')
        return redirect(url_for('index'))

    return render_template('reset_password.html', title='Reset Password', form=form)

