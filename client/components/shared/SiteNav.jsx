import React from 'react';
import { Link } from 'react-router-dom';

const SiteNav = () => (
  <nav className="site-header__nav">
    <div className="nav-wrapper container">
      <Link to="/" className="brand-logo">MoreRecipes</Link>
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/user/id">Profile</Link>
        </li>
      </ul>
      <ul className="side-nav" id="mobile-nav">
        <li>
          <Link to="/user/id">Profile</Link>
        </li>
      </ul>
      <a href="#" data-activates="mobile-nav" className="button-collapse">
        <i className="material-icons">menu</i>
      </a>
    </div>
  </nav>
);

export default SiteNav;
