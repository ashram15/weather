from flask import Flask, url_for, render_template  # request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


# should be at end of file
if __name__ == "__main__":
    app.run(debug=True)
