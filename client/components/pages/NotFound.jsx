import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page page__not-found">
    <main>
      <h1>404</h1>
      <p>Sorry, the web page your are looking for is missing
        <span role="img" aria-label="cry">😭</span>
      </p>
      <Link to="/">Go back to the home page</Link>
    </main>
  </div>
);


export default NotFound;
