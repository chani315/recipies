import "../css/RecipeDetails.css"; 
import { useParams } from "react-router-dom"; 
import { useSelector } from 'react-redux'; 
import { updateFavorite } from "../Store/RecipeSlice";
import { useDispatch } from "react-redux"; 
import { useEffect, useState } from "react"; 
import useParseInt from "../hooks/useParseInt"
const RecipeDetails = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(x => x.RecipeSlice.recipes); 
    const { Id } = useParams(); 
    const [recipe, setRecipe] = useState(null); 

    const recipeIndex = useParseInt(Id); // כאן נקרא ה-Hook
    const selectRecipy = recipes[recipeIndex]; // שליפת המתכון המתאים

    useEffect(() => {
        setRecipe(selectRecipy || null); // עדכון ה-state עם המתכון שנמצא
    }, [Id, recipes, recipeIndex]); // הוספתי את recipeIndex כתלות נוספת

    if (!recipe) {
        
        return <div className="homeImage3"><p className="notfound">טוען נתונים או שהמתכון לא נמצא...</p></div>; // הצגת הודעה במקרה שהמתכון לא נמצא
    }

    const productsList = recipe.products; // רשימת המצרכים של המתכון
    const instructionsList = recipe.instructions; // רשימת ההוראות של המתכון

    return (
        <>
            <div className="homeImage3">
                <div className="categ">
                    <div className="title">{recipe.title}</div>

                    {/**סימון מועדף */}
                    <div className="love">
                        <div className="plove">סימון כמועדף</div>
                        <div class="heart-container" title="Like">
                            {/* <p>סמן כמועדף</p> */}
                            <input type="checkbox" class="checkbox" id="Give-It-An-Id" onClick={() => dispatch(updateFavorite({ recipeIndex: recipeIndex }))} />
                            <div class="svg-container" >
                                <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                    </path>
                                </svg>
                                <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                    </path>
                                </svg>
                                <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="10,10 20,20"></polygon>
                                    <polygon points="10,50 20,50"></polygon>
                                    <polygon points="20,80 30,70"></polygon>
                                    <polygon points="90,10 80,20"></polygon>
                                    <polygon points="90,50 80,50"></polygon>
                                    <polygon points="80,80 70,70"></polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <img className="picture" src={recipe.image.startsWith("blob") ? recipe.image : `/images/recipes/${recipe.image}`} />

                    <div className="about">
                        <ul className="bodyabout">
                            <li className="li1">
                                <span className="li">זמן הכנה:</span>
                                <span className="li" id="li1">{recipe.time}</span>
                            </li>
                            <li className="li1">
                                <span className="li">רמת קושי:</span>
                                <span className="li" id="li2">{recipe.level}</span>
                            </li>
                            <li className="li1">
                                <span className="li">כמות:</span>
                                <span className="li" id="li3">{recipe.amount}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="productslist">
                        {productsList.map((product) => (
                            <div className="p">• {product}</div>
                        ))}
                    </div>

                    <div className="instructions">
                        {instructionsList.map((instruction, index) => (
                            <div className="i"> {instruction}</div>
                        ))}
                    </div>
                </div>
                <div className="bon-appetit">בתאבון!</div>
            </div>
        </>
    );
};

export default RecipeDetails;
