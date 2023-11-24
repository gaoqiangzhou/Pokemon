from flask import Flask, request, jsonify
from flask_cors import CORS
import pprint
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from io import StringIO
# Load the dataset
import pandas as pd
import certifi
ca = certifi.where()

# api route
app = Flask(__name__)
CORS(app)
#MongoDb config
client = MongoClient('mongodb+srv://poke:z123123@cluster0.315hxqa.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client['pokemon']
pokeCollection = db['pokemon']

# Adjust file path to the file's location
pokemon_data = pd.DataFrame(list(pokeCollection.find({}, {"_id": 0}).sort("Pokedex Number")))

# Map 'Status' to the corresponding index
status_mapping = {
    'Normal': 0,
    'Sub Legendary': 1,
    'Mythical': 2,
    'Legendary': 3
}

pokemon_data['Status'] = pokemon_data['Status'].map(status_mapping)

# Extract relevant features and target variables for primary and secondary types
X = pokemon_data[['Generation', 'Status', 'Against Normal', 'Against Fire', 'Against Water', 'Against Electric', 
                  'Against Grass', 'Against Ice', 'Against Fighting', 'Against Poison', 'Against Ground', 'Against Flying',
                  'Against Psychic', 'Against Bug', 'Against Rock', 'Against Ghost', 'Against Dragon',
                  'Against Dark', 'Against Steel', 'Against Fairy']]
y_primary = pokemon_data['Primary Type']
y_secondary = pokemon_data['Secondary Type']
# Split into training and testing sets
X_train, X_test, y_primary_train, y_primary_test, y_secondary_train, y_secondary_test = train_test_split(
    X, y_primary, y_secondary, test_size=0.2, random_state=42
)
# Train the classifier for primary typing
rf_classifier_primary = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier_primary.fit(X_train, y_primary_train)
# Train the classifier for secondary typing
rf_classifier_secondary = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier_secondary.fit(X_train, y_secondary_train)
# Test set to predict the primary and secondary typing of Pokemon
y_primary_pred = rf_classifier_primary.predict(X_test)
y_secondary_pred = rf_classifier_secondary.predict(X_test)
# Calculate accuracy and other evaluation metrics for primary typing
accuracy_primary = accuracy_score(y_primary_test, y_primary_pred)
classification_rep_primary = classification_report(y_primary_test, y_primary_pred)
# Calculate accuracy and other evaluation metrics for secondary typing
accuracy_secondary = accuracy_score(y_secondary_test, y_secondary_pred)
classification_rep_secondary = classification_report(y_secondary_test, y_secondary_pred)
# Predict the primary and secondary types for one Pokemon

# Format is Generation, Status, Type effectiveness (Against Normal, Against Fire, ... , Against Fairy)
# Insert values in the correct order. Change 'Status' to its corresponding index
new_pokemon_attributes = [[1, 0, 1, 2, 0.5, 0.5, 0.25, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0.5]]  

# Create a DataFrame with the same column names for the test data
new_pokemon_data = pd.DataFrame(new_pokemon_attributes, columns=X.columns)

predicted_primary_type = rf_classifier_primary.predict(new_pokemon_data)
predicted_secondary_type = rf_classifier_secondary.predict(new_pokemon_data)

@app.route('/predict', methods=['POST'])
def predict():
    data = str(request.get_json()).replace(", ", ",").replace(": ", ":").replace("'", '"')
    string_io = StringIO(data)
    eval_data = pd.read_json(string_io, orient="split")
    # Map 'Status' to the corresponding index
    status_mapping = {
      'Normal': 0,
      'Sub Legendary': 1,
      'Mythical': 2,
      'Legendary': 3
    }
    eval_data['Status'] = eval_data['Status'].map(status_mapping)
    # Use the trained models to predict types
    predicted_primary_type = rf_classifier_primary.predict(eval_data)
    predicted_secondary_type = rf_classifier_secondary.predict(eval_data)
    # Create a DataFrame with the predicted types and the original data
    result_df = eval_data.copy()
    result_df['Predicted Primary Type'] = predicted_primary_type
    result_df['Predicted Secondary Type'] = predicted_secondary_type
    # Export the results to another CSV file
    res = result_df.to_json(orient="split")
    return res
@app.route('/pokemon', methods=['GET'])
def getPokemonByNameIdType():
    name = request.args.get('name')
    id = request.args.get('id')
    type = request.args.get('type')
    type1 = request.args.get('type1')
    type2 = request.args.get('type2')
    if(name):
        res = pokeCollection.find_one({"Name": name}, {"_id": 0})
        return res
    elif(id):
        res = pokeCollection.find_one({"Pokedex Number": int(id)}, {"_id": 0})
        return res
    elif(type):
        res = list(pokeCollection.find({ "$or": [{"Primary Type": type}, {"Secondary Type": type}] }, {"_id": 0}))
        return res
    else:
        res = list(pokeCollection.find({"$or": [{ "$and": [{"Primary Type": type2}, {"Secondary Type": type1}] }, { "$and": [{"Primary Type": type1}, {"Secondary Type": type2}] }]}, {"_id": 0}))
        return res





if __name__ == "__main__":
    app.run(debug=True)