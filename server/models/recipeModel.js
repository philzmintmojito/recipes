// const mongoose = require('mongoose');
// const db = require("./keys").mongoURI;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipeDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("CONNECTION OPEN!!!"))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    category: String,
    ingredient: String,
    instruction: String,
    imageURL: String
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;
