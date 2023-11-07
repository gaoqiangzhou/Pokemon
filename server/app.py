from flask import Flask, request, jsonify
from pymongo import MongoClient
import certifi
ca = certifi.where()

# api route
app = Flask(__name__)
#MongoDb config
client = MongoClient('mongodb+srv://poke:z123123@cluster0.315hxqa.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client['pokemon']
pokeCollection = db['pokemon']

myquery = { "Pokedex Number": 1 }
mydoc = pokeCollection.find(myquery)
for x in mydoc:
  print(x)

@app.route('/')
def index():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)