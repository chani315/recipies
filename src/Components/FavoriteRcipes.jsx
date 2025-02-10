import "../css/RecipeDetails.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * קומפוננטה להצגת רשימת המתכונים המועדפים.
 * משתמשת ב-Redux כדי לשלוף את רשימת המתכונים המסומנים כמועדפים.
 */
const FavoritesRecipes = () => {
    // שליפת רשימת המתכונים מה-Redux store
    const recipes = useSelector(x => x.RecipeSlice.recipes);
    
    // סינון המתכונים המועדפים בלבד
    const favoriteList = recipes.filter(r => r.favorite === true);
    
    return (
        <>
            <div className="homeImage3">
                <div className='allRecipes'>
                    {favoriteList.map((recipe) => (
                        <Link to={`/RecipeList/${recipe.id}`} key={recipe.id}>
                            <div className='imagesDiv'>
                                {/* הצגת כותרת המתכון */}
                                <p>{recipe.title}</p>
                                
                                {/* הצגת תמונת המתכון */}
                                <img 
                                    className="rcapiyImage" 
                                    src={
                                        recipe.image.startsWith("blob")
                                            ? recipe.image
                                            : `/images/recipes/${recipe.image}`
                                    } 
                                    alt="Description of the image" 
                                />
                                
                                {/* שכבת מידע נוספת על המתכון */}
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
            
            {/* הצגת הודעה אם אין מתכונים מועדפים */}
            {favoriteList.length === 0 ? (
                <div className='noFavorites'>אין מתכונים ברשימת המועדפים</div>
            ) : ''}
        </>
    );
};

export default FavoritesRecipes;
