from flask import render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, db
from app.forms import RegisterForm, LoginForm, ResetUsernameForm, ResetEmailForm, ResetPasswordForm,JournalEntryForm,CategoryForm
from app.models import User, Category, JournalEntry
from app.utils import login_required



@app.route('/')
@app.route('/index')
@login_required
def index():
    user = User.query.get(session['user_id'])
    return render_template('index.html', title='Home', user=user)

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


@app.route('/categories', methods=['GET', 'POST'])
@login_required
def manage_categories():
    form = CategoryForm()
    if form.validate_on_submit():
        category = Category(name=form.name.data)
        db.session.add(category)
        db.session.commit()
        flash('Category added successfully!', 'success')
        return redirect(url_for('manage_categories'))

    categories = Category.query.all()
    return render_template('categories.html', title='Manage Categories', form=form, categories=categories)


@app.route('/categories/<int:category_id>/delete', methods=['POST'])
@login_required
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    flash('Category deleted successfully!', 'success')
    return redirect(url_for('categories'))

@app.route('/journal_entries', methods=['GET', 'POST'])
@login_required
def manage_journal_entries():
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
        flash('Journal entry added successfully!', 'success')
        return redirect(url_for('manage_journal_entries'))

    journal_entries = JournalEntry.query.filter_by(user_id=session['user_id']).all()
    return render_template('journal_entries.html', title='Manage Journal Entries', form=form, journal_entries=journal_entries)




@app.route('/journal_entries/<int:entry_id>/delete', methods=['POST'])
@login_required
def delete_journal_entry(entry_id):
    entry = JournalEntry.query.get_or_404(entry_id)
    if entry.user_id != session['user_id']:
        flash('You do not have permission to delete this entry.', 'danger')
        return redirect(url_for('journal_entries'))
    db.session.delete(entry)
    db.session.commit()
    flash('Journal entry deleted successfully!', 'success')
    return redirect(url_for('journal_entries'))

@app.route('/journal_entries/<int:entry_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_journal_entry(entry_id):
    entry = JournalEntry.query.get_or_404(entry_id)
    if entry.user_id != session['user_id']:
        flash('You do not have permission to edit this entry.', 'danger')
        return redirect(url_for('journal_entries'))

    form = JournalEntryForm(obj=entry)
    form.category.choices = [(category.id, category.name) for category in Category.query.all()]
    if form.validate_on_submit():
        entry.title = form.title.data
        entry.content = form.content.data
        entry.category_id = form.category.data
        db.session.commit()
        flash('Journal entry updated successfully!', 'success')
        return redirect(url_for('journal_entries'))

    return render_template('edit_journal_entry.html', title='Edit Journal Entry', form=form, entry=entry)




