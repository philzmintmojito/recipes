import React from "react";
// import { withRouter } from 'react-router-dom';
import "../Recipe.css"
import { Link } from 'react-router-dom';


const RecipeCard = ({
    id,
    imageURL,
    title,
    ingredient,
    instruction,
    deleteCard
}) => {
9
    return (
        <div className="recipe_container">
            <img src={imageURL} alt={title} className="recipe-img" />
            <h1 className="recipe-title">{title}</h1>
            <div>
                <p className='label'>Ingredients:  </p>
                <p name='ingredients' className="recipe-description">{ingredient} </p>
            </div>
            <div>
                <p className='label'>Instructions: </p>
                <p className="recipe-description">{instruction}</p>
            </div>

            <div className='button_container'>
                <Link to={'/update'} state={{id, title, ingredient, instruction, imageURL}}>
                    <button type="button" className="btnUPDATE"> Update </button>
                </Link>
                <button type="button" className="btnDELETE" onClick={() => deleteCard(id)}>Delete</button>
            </div>
        </div>
    )
}

export default RecipeCard;
