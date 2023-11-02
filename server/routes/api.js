const express = require('express');

const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/',
  recipeController.getRecipes,
  (req, res) => res.status(200).json(res.locals.recipes)
);

router.post('/recipe',
  recipeController.addRecipe,
  (req, res) => res.status(200).json(res.locals.newRecipe)
);

router.put('/recipe/:id',
  recipeController.updateRecipe,
  (req, res) => res.status(200).send("recipe is updated!")
);

router.delete('/recipe/:id',
  recipeController.deleteRecipe,
  (req, res) => res.status(200).send("recipe is deleted!")
);

module.exports = router;
