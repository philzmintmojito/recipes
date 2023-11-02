import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const CreateCard = props => {
  const navigate = useNavigate();

  const [ title, titleOnChange ] = useInput('');
  const [ ingredient, ingredientOnChange ] = useInput('');
  const [ instruction, instructionOnChange ] = useInput('');
  const [ imageURL, imageURLOnChange ] = useInput('');
  const [ titleError, setTitleError ] = useState(null);

  const saveRecipe = () => {
    // check if name is empty
    if (title === '') {
      setTitleError('required');
    // check if height is not a number
    // } else if(ingredient === ''){
    //   setIngredientError('must input ingredient');
    // } else if(ingredient === ''){
    //     setInstructionError('must input instruction');
    // } else if(imgSrc === ''){
    //     setImageError('please show the food photo');
    } else {
      const body = {
        title,
        ingredient,
        instruction,
        imageURL
      };
      fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .catch(err => console.log('CreateCard for recipe fetch /api/recipe: ERROR: ', err));
    }
    navigate('/');
  };

  useEffect(()=>{
    setTitleError(null);
  }, [title]);

  return (
    <section className="mainSection createRecipeContainer">
      <header className="pageHeader">
        <h2>Recipe Creator</h2>
        <Link to="/" className="backLink">
          <button type="button" className="btnSecondary">
              Back to all recipes
          </button>
        </Link>
      </header>
      <article className="formRecipe">
        <h3>Enter your recipe details</h3>
        <div className="createRecipeFields">
          <label htmlFor="title">Recipe Name: </label>
          <input name="title" placeholder="Recipe Name" value={title} onChange={titleOnChange} />
          {titleError ? (<span className="errorMsg">{titleError}</span>) : null}
        </div>
        <div className="createRecipeFields">
          <label htmlFor="ingredient">Ingredients: </label>
          <textarea name="ingredient" placeholder="" value={ingredient} onChange={ingredientOnChange} />
        </div>
        <div className="createRecipeFields">
          <label htmlFor="instruction">Cooking Instructions: </label>
          <textarea name="instruction" value={instruction} onChange={instructionOnChange} />
        </div>
        <div className="createRecipeFields">
          <label htmlFor="imageURL">Photo URL: </label>
          <input name="imageURL" placeholder="" value={imageURL} onChange={imageURLOnChange} />
        </div>

        <div className="buttonContainer">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary" onClick={() =>navigate('/')}>
              Cancel
            </button>
          </Link>
          <button type="button" className="btnMain" onClick={saveRecipe}>Save</button>
        </div>
      </article>
    </section>
  );
};

export default CreateCard;
