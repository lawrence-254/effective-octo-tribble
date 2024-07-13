from flask import render_template, redirect, url_for, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, csrf, db, generate_csrf
from app.forms import RegisterForm, LoginForm, ResetUsernameForm, ResetEmailForm, ResetPasswordForm, JournalEntryForm, CategoryForm
from app.models import User, Category, JournalEntry
from app.utils import login_required


@app.route('/api/v1/get-csrf-token', methods=['GET'])
def get_csrf_token():
    try:
        token = generate_csrf()
        session['_csrf_token'] = token
        return jsonify({'csrf_token': token})
    except Exception as e:
        app.logger.error(f"Error generating CSRF token: {e}")
        return jsonify({'error': 'Failed to generate CSRF token'}), 500


# Index/home route
@app.route('/api/v1/')
@app.route('/api/v1/index')
# @login_required
def index():
    user = User.query.get(session['user_id'])
    return jsonify({
        'title': 'Home',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })


# Registration route

@app.route('/api/v1/register', methods=['POST'])
def register():
    form = RegisterForm(data=request.json)

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
            return jsonify({'message': 'Registration successful! You can now log in.'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'User already exists.', 'details': str(e)}), 400

    return jsonify({'error': 'Invalid data submitted.', 'errors': form.errors}), 400


# Login route
@app.route('/api/v1/login', methods=['POST'])
def login():
    if 'user_id' in session:
        return jsonify({'message': 'Already logged in.'}), 200

    data = request.get_json()
    print("Received data:", data)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.hashed_password, password):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'error': 'Invalid username or password.'}), 401

# Logout route
@app.route('/api/v1/logout', methods=['POST'])
@login_required
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({'message': 'Logout successful.'}), 200

# Reset username route
@app.route('/api/v1/reset_username', methods=['POST'])
@login_required
def reset_username():
    form = ResetUsernameForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.username = form.new_username.data
        db.session.commit()
        return jsonify({'message': 'Username updated successfully!'}), 200
    return jsonify({'error': 'Invalid data submitted.'}), 400

# Reset email route
@app.route('/api/v1/reset_email', methods=['POST'])
@login_required
def reset_email():
    form = ResetEmailForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.email = form.new_email.data
        db.session.commit()
        return jsonify({'message': 'Email updated successfully!'}), 200
    return jsonify({'error': 'Invalid data submitted.'}), 400

# Reset password route
@app.route('/api/v1/reset_password', methods=['POST'])
@login_required
def reset_password():
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user = User.query.get(session['user_id'])
        user.hashed_password = generate_password_hash(form.new_password.data)
        db.session.commit()
        return jsonify({'message': 'Password updated successfully!'}), 200
    return jsonify({'error': 'Invalid data submitted.'}), 400

# Manage categories route
@app.route('/api/v1/categories', methods=['GET', 'POST'])
@login_required
def manage_categories():
    if request.method == 'POST':
        form = CategoryForm()
        if form.validate_on_submit():
            category = Category(name=form.name.data)
            db.session.add(category)
            db.session.commit()
            return jsonify({'message': 'Category added successfully!'}), 201
        return jsonify({'error': 'Invalid data submitted.'}), 400

    elif request.method == 'GET':
        categories = Category.query.all()
        return jsonify([category.serialize() for category in categories]), 200

# Delete category route
@app.route('/api/v1/categories/<int:category_id>/delete', methods=['DELETE'])
@login_required
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully!'}), 200

# Manage journal entries route
@app.route('/api/v1/journal_entries', methods=['GET', 'POST'])
@login_required
def manage_journal_entries():
    if request.method == 'POST':
        form = JournalEntryForm()
        if form.validate_on_submit():
            journal_entry = JournalEntry(
                title=form.title.data,
                content=form.content.data,
                category_id=form.category.data,
                user_id=session['user_id']
            )
            db.session.add(journal_entry)
            db.session.commit()
            return jsonify({'message': 'Journal entry added successfully!'}), 201
        return jsonify({'error': 'Invalid data submitted.'}), 400

    elif request.method == 'GET':
        journal_entries = JournalEntry.query.filter_by(user_id=session['user_id']).all()
        return jsonify([entry.serialize() for entry in journal_entries]), 200

# Delete journal entry route
@app.route('/api/v1/journal_entries/<int:entry_id>/delete', methods=['DELETE'])
@login_required
def delete_journal_entry(entry_id):
    entry = JournalEntry.query.get_or_404(entry_id)
    if entry.user_id != session['user_id']:
        return jsonify({'error': 'You do not have permission to delete this entry.'}), 403
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Journal entry deleted successfully!'}), 200

# Edit journal entry route
@app.route('/api/v1/journal_entries/<int:entry_id>/edit', methods=['PUT'])
@login_required
def edit_journal_entry(entry_id):
    entry = JournalEntry.query.get_or_404(entry_id)
    if entry.user_id != session['user_id']:
        return jsonify({'error': 'You do not have permission to edit this entry.'}), 403

    form = JournalEntryForm()
    if form.validate_on_submit():
        entry.title = form.title.data
        entry.content = form.content.data
        entry.category_id = form.category.data
        db.session.commit()
        return jsonify({'message': 'Journal entry updated successfully!'}), 200
    return jsonify({'error': 'Invalid data submitted.'}), 400



