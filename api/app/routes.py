from app import app
from flask import render_template
from app.forms import RegisterForm, LoginForm


@app.route('/')
@app.route('/index')
def index():
    user = {'username' : 'mozart'}
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
#     return jsonify({'title': 'Home', 'user': user, 'posts': posts})
    return render_template('index.html', title='Home', user=user, posts=posts)


@app.route('/register', methods=['POST'])
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


@app.route('/login')
def login():
    form=LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect('/index')
    return render_template('login.html', title='LOGIN', form=form)
