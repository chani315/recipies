
import './App.css';
import AppBar from './Components/AppBar';
import React, { Suspense } from 'react';
import { Link, Route, Routes, Router } from 'react-router-dom';
import Home from './Components/Home';

const LazyRecipeList=React.lazy(()=>import("./Components/RecipeList"))
const LazyLogin=React.lazy(()=>import("./Components/Login"))
const LazyRecipeDetails=React.lazy(()=>import("./Components/RecipeDetails"))
const LazyFavoriteRecipes=React.lazy(()=>import("./Components/FavoriteRcipes"))
const LazyAddRecipe=React.lazy(()=>import("./Components/AddRecipe"))
const LazyPage404=React.lazy(()=>import("./Components/Page404"))

function App() {
  return (
    <div className="App">
      <AppBar/>

      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/RecipeList' element={<Suspense fallback={'loading...'}><LazyRecipeList /></Suspense>} /> 
        <Route path='/FavoritesRecipes' element={<Suspense fallback={'loading...'}><LazyFavoriteRecipes /></Suspense>} />
        <Route path='/AddRecipe' element={<Suspense fallback={'loading...'}><LazyAddRecipe /></Suspense>} /> 
        <Route path='/RecipeList/:Id' element={<Suspense fallback={'loading...'}><LazyRecipeDetails/></Suspense>} /> 
        <Route path='/login' element={<Suspense fallback={'loading...'}><LazyLogin /></Suspense>} />    
        <Route path="*" element={<Suspense fallback={'loading...'}><LazyPage404 /></Suspense>} />

      </Routes>
    </div>
  );
}

export default App;
