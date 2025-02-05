import "../css/RecipeList.css"
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
const RecipeList = () => {
const recipes = useSelector(x=>x.RecipeSlice.recipes)
    return (
        <>
        <div className="homeImage3">
            <div className='allRecipes'>
                {recipes.map((recipe, index) => (
                    <Link to={`/RecipeList/${index+1}`}>
                        <div className='imagesDiv'>
                            <p>{recipe.title}</p>
                            <img className="rcapiyImage" src={
                    recipe.image.startsWith("blob")
                        ? recipe.image
                        : `/images/recipes/${recipe.image}`
                        } alt="Description of the image" />
                            

                            <div className="hoverDetails">
                                {/* <h3>{recipe.title}</h3> */}
                                <div className='topDetails'></div>
                                <p>זמן הכנה: {recipe.time}</p>
                                <p>קטגוריה: {recipe.category}</p>
                                <p>כמות: {recipe.amount}</p>
                        </div>
                        </div>
                       
                    </Link>  
                ))}
            </div>    
        </div>
        </>
    );
};

export default RecipeList;
