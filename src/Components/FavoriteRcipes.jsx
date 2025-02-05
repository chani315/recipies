import "../css/RecipeDetails.css"
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
const FavoritesRecipes = () => {
const recipes = useSelector(x=>x.RecipeSlice.recipes)
const favoriteList=recipes.filter(r=>r.favorite===true)
    return (
        <>
        <div className="homeImage3">
            <div className='allRecipes'>
                {favoriteList.map((recipe) => (
                    <Link to={`/RecipeList/${recipe.id}`}>
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
        {favoriteList.length===0?(<div className='noFavorites'>אין מתכונים ברשימת המועדפים</div>):''}
        </>
    );
};

export default FavoritesRecipes;
