# Import Dependencies
from flask import Flask, render_template, request
from flask_pymongo import PyMongo
import os


# Hidden authetication file
#import config

# Create an instance of Flask app
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection locally
app.config['MONGO_DBNAME'] = 'crash_db'
app.config["MONGO_URI"] = "mongodb://localhost:27017/crash_db"
mongo = PyMongo(app)

# Create route that renders crash_db.html template and finds documents from mongo
@app.route("/")
def home():

    # Find data
    bike_info = mongo.db.biker_information.find()

    # Return template and data
    return render_template("crash_db.html", bike_info=bike_info)


if __name__ == "__main__":
    app.run(debug=True)
