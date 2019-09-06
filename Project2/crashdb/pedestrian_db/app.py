# Import Dependencies
from flask import Flask, render_template, request
from flask_pymongo import PyMongo
import os


# Hidden authetication file
#import config

# Create an instance of Flask app
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection locally
app.config['MONGO_DBNAME'] = 'crash_pedestrian_db'
app.config["MONGO_URI"] = "mongodb://localhost:27017/crash_pedestrian_db"
mongo = PyMongo(app)

# Create route that renders index.html template and finds documents from mongo
@app.route("/")
def home():

    # Find data
    pedestrian_info = mongo.db.pedestrian.find()
    pedestrians = []
    for pedestrian in pedestrian_info:
        pedestrians.append({i:pedestrian[i] for i in pedestrian if i != 'id'})

    # Return template and data
    return render_template("index.html", pedestrian_info=pedestrians)


if __name__ == "__main__":
    app.run(debug=True)
