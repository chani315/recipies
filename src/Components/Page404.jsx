import React from "react";
import { Link } from "react-router-dom";
import "../css/Page404.css"

const Page404 = () => {
  return (
    <div className="page-404">
      <div className="content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Page404;

  