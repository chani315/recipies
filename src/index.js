import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RecipeSlice from './Store/RecipeSlice';
import UserSlice from './Store/UserSlice'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';


const myStore = configureStore({
  reducer:{
    
    UserSlice,
    RecipeSlice
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
