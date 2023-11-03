import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../Update.css";


// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const UpdateCard = props => {
  const location = useLocation()
  const navigate = useNavigate()
  const [ title, titleOnChange ] = useInput(location.state.title);
  const [ ingredient, ingredientOnChange ] = useInput(location.state.ingredient);
  const [ instruction, instructionOnChange ] = useInput(location.state.instruction);
  const [ imageURL, imageURLOnChange ] = useInput(location.state.imageURL);
  const [ titleError, setTitleError ] = useState(null);

  const updateRecipe = () => {
    // check if name is empty
    if (title === '') {
      setTitleError('required');

    } else {
      const body = {
        title,
        ingredient,
        instruction,
        imageURL
      };
      fetch(`/api/recipe/${location.state.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .catch(err => console.log('Update recipe fetch /api/recipe: ERROR: ', err));
    }
    navigate('/');
  };

  useEffect(()=>{
    setTitleError(null);
  }, [title]);

  return (
    <section className="mainSection updateRecipeContainer">
      <header className="pageHeader">
        <h2>Update Recipe</h2>
        <Link to="/" className="backLink">
          <button type="button" className="btnSecondary">
              Back to all recipes
          </button>
        </Link>
      </header>
      <article className="formRecipe">
        <h3>Update your recipe details</h3>
        <div className="updateRecipeFields">
          <label htmlFor="title">Recipe Name: </label>
          <input name="title" placeholder={title} value={title} onChange={titleOnChange} />
          {titleError ? (<span className="errorMsg">{titleError}</span>) : null}
        </div>
        <div className="updateRecipeFields">
          <label htmlFor="ingredient">Ingredients: </label>
          <textarea name="ingredient" placeholder={ingredient} value={ingredient} onChange={ingredientOnChange} />
        </div>
        <div className="updateRecipeFields">
          <label htmlFor="instruction">Cooking Instructions: </label>
          <textarea name="instruction" placeholder={instruction} value={instruction} onChange={instructionOnChange} />
        </div>
        <div className="updateRecipeFields">
          <label htmlFor="imageURL">Photo URL: </label>
          <input name="imageURL" placeholder={imageURL} value={imageURL} onChange={imageURLOnChange} />
        </div>

        <div className="buttonContainer">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary" onClick={() => navigate('/')}>
              Cancel
            </button>
          </Link>
          <button type="button" className="btnUpdate" onClick={updateRecipe}>Update</button>
        </div>
      </article>
    </section>
  );
};

export default UpdateCard;
