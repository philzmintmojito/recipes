import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.jsx';
import "../Recipes.css"


class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedRecipes: false,
      recipes: [],
    };
  }
  deleteCard = (id) => {
    fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log('Delete recipe fetching /api/recipe: ERROR: ', err));
    const newRecipes = [];
    for (let recipe of this.state.recipes) {
      if (recipe._id !== id){
        newRecipes.push(recipe);
      }
    }
    this.setState({...this.state,recipes: newRecipes})
  }
  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then((recipes) => {
        if (!Array.isArray(recipes)) recipes = [];
        return this.setState({
          recipes,
          fetchedRecipes: true
        });
      })
      .catch(err => console.log('recipes.componentDidMount: get recipes: ERROR: ', err));
  }

  render() {
    if (!this.state.fetchedRecipes) return (
      <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );

    const { recipes } = this.state;


    if (!recipes) return null;

    if (!recipes.length) return (
      <div>Sorry, no recipes found</div>
    );

    const recipeElems = recipes.map((recipe) => {
      return (
        <RecipeCard
          key={recipe._id}
          id={recipe._id}
          imageURL={recipe.imageURL}
          title={recipe.title}
          ingredient={recipe.ingredient}
          instruction={recipe.instruction}
          deleteCard = {this.deleteCard}
        />
      );
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h2>Recipes</h2>
          <Link to={'/create'}>
            <button
              type="button"
              className="btnSecondary"
            >
              Create Recipes
            </button>
          </Link>
        </header>
        <div className="recipeCollection">
          {recipeElems}
        </div>
      </section>
    );
  }
}

export default Recipes;
