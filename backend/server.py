from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import os 
from dotenv import load_dotenv

load_dotenv() 
 
app = Flask(__name__)
 
 
app.secret_key = 'your secret key'
 
app.config['MYSQL_HOST'] = str(os.getenv('SQL_HOST'))
app.config['MYSQL_USER'] = str(os.getenv('SQL_USER'))
app.config['MYSQL_PASSWORD'] = str(os.getenv('SQL_PASSWORD'))
app.config['MYSQL_DB'] = str(os.getenv('SQL_DB'))
 
mysql = MySQL(app)
 
@app.route('/', methods=['GET', 'POST'])
def login():
    # Output message if something goes wrong...
    msg = ''
    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST':
        print(request)
        # Create variables for easy access
        username = request.args['username']
        password = request.args['password']
        # Check if account exists using MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
        # Fetch one record and return result
        account = cursor.fetchone()
        # If account exists in accounts table in out database
        if account:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            # Redirect to home page
            msg='Logged in successfully !'
            return (msg)
        else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
    # Show the login form with message (if any)
    return (msg)
@app.route('/logout')
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redirect to login page
   return ("Logged out successfully !")
@app.route('/register', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST':
        # Create variables for easy access
        username = request.args['username']
        password = request.args['password']
        email = request.args['email']
        # Check if account exists using MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            msg = 'Account already exists!'
        elif not username or not password or not email:
            msg = 'Please fill out the form!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into accounts table
            cursor.execute('INSERT INTO users VALUES (NULL, %s, %s, %s)', (username, password, email,))
            mysql.connection.commit()
            msg = 'You have successfully registered!'
    # Show registration form with message (if any)
    return (msg)
@app.route('/home')
def home():
    # Check if user is loggedin
    if 'loggedin' in session:
        # User is loggedin show them the home page
        return (session['username'])
    # User is not loggedin redirect to login page
    return ("logged out")

@app.route('/profile')
def profile():
    # Check if user is loggedin
    if 'loggedin' in session:
        # We need all the account info for the user so we can display it on the profile page
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE id = %s', (session['id'],))
        account = cursor.fetchone()
        # Show the profile page with account info
        return ("logged in")
    # User is not loggedin redirect to login page
    return ("logged out")
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)