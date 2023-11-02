const Recipe = require('../models/recipeModel');

const recipeController = {};

recipeController.getRecipes = (req, res, next) => {
  // write code here
  Recipe.find().exec()
    .then(data=> {
      res.locals.recipes = data;
      next();
    })
    .catch(err => {
      next({
        log: `recipeController.getRecipes: ${err}`,
        message: {err: 'recipeController.getRecipes: Something went wrong with getting recipes.'}
      });
    })

};


recipeController.addRecipe = (req, res, next) => {
  // write code here
  // name, gender, species, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld, homeworld_id, films
  const { title, category, ingredient, instruction, imageURL } = req.body;
  console.log(req.body);
  Recipe.create({ title, category, ingredient, instruction, imageURL },
    (err, recipe) => {
      if (err) {
        return next({
          log: `recipeController.addRecipe: ${err}`,
          message: {err: 'recipeController.addRecipe: Something went wrong with adding new recipe.'}
        });
      }
      res.locals.newRecipe = recipe;
      next();
    });

};

recipeController.deleteRecipe = (req, res, next) => {
  // write code here
  // name, gender, species, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld, homeworld_id, films
  const { id } = req.params;

  Recipe.findOneAndDelete({ _id: id },
    (err, _recipe) => {
      if (err) {
        return next({
          log: `recipeController.deleteRecipe: ${err}`,
          message: {err: 'recipeController.deleteRecipe: Something went wrong with deleting this recipe.'}
        });
      }
      next();
    });

};

recipeController.updateRecipe = (req, res, next) => {
  // write code here
  const { id } = req.params;
  const { ingredient, instruction, title, imageURL} = req.body;

  Recipe.updateOne({ _id: id }, {ingredient, instruction, title, imageURL}).exec()
    .then ( next())
    .catch(err => {
      next({
          log: `recipeController.updateRecipe: ${err}`,
          message: {err: 'recipeController.updateRecipe: Something went wrong with updating this recipe.'}
        });
      }
    );

};

module.exports = recipeController;
