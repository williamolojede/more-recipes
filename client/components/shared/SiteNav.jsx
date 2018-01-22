import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { currentUserPropTypes } from '../../config/proptypes';
import { logoutUser } from '../../actions/loginUser';

import NavDropDown from './NavDropDown';

import UserImg from './UserImg';

export class SiteNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };
  }

  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(logoutUser());
  }

  render() {
    const { currentUser } = this.props;
    return (
      <nav className="site-header__nav">
        <div className="nav-wrapper container">
          <Link to="/" className="left brand-logo">MoreRecipes</Link>

          <button className="dropdown right" onClick={this.toggleNav}>
            <UserImg user={currentUser} type="inSiteNav" />
            {
              this.state.navOpen &&
              <NavDropDown
                fullname={currentUser.fullname}
                handleLogout={this.logout}
              />
            }
            {
              this.state.navOpen &&
              <div
                className="dropdown-overlay"
                role="button"
                tabIndex={0}
                onClick={this.toggleNav}
              />
            }
          </button>
        </div>
      </nav>
    );
  }
}

SiteNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ...currentUserPropTypes
};

export default connect(null)(SiteNav);
