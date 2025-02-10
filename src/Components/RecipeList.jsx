import "../css/RecipeList.css"
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

// קומפוננטה להצגת רשימת המתכונים
const RecipeList = () => {
    // שליפת רשימת המתכונים מה-Redux store
    const recipes = useSelector(x=>x.RecipeSlice.recipes)
    
    return (
        <>
        <div className="homeImage3">
            <div className='allRecipes'>
                {recipes.map((recipe, index) => (
                    // יצירת קישור לכל מתכון בעמוד הרשימה
                    <Link to={`/RecipeList/${index+1}`}>
                        <div className='imagesDiv'>
                            <p>{recipe.title}</p>
                            {/* הצגת תמונת המתכון */}
                            <img className="rcapiyImage" src={
                                recipe.image.startsWith("blob")? recipe.image: `/images/recipes/${recipe.image}`
                            } alt="Description of the image" />                           
                            {/* הצגת פרטי המתכון בעת ריחוף */}
                            <div className="hoverDetails">
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
