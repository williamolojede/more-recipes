import React from 'react';

const SiteNav = () => (
  <nav className="site-header__nav">
    <div className="nav-wrapper container">
      <a href="/" className="brand-logo">MoreRecipes</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="profile.html">Profile</a></li>
      </ul>
      <ul className="side-nav" id="mobile-nav">
        <li><a href="profile.html">Profile</a></li>
      </ul>
      <a href="#" data-activates="mobile-nav" className="button-collapse">
        <i className="material-icons">menu</i>
      </a>
    </div>
  </nav>
);

export default SiteNav;
