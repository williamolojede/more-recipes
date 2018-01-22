import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ConnectedSiteNav from '../shared/SiteNav';
import SiteFooter from '../shared/SiteFooter.jsx';
import Notification from '../shared/Notification.jsx';

import { currentUserPropTypes } from '../../config/proptypes';

class ManageRecipes extends Component {
  render() {
    return (
      <div className="page page-manage">
        <header className="site-header">
          <ConnectedSiteNav currentUser={this.props.currentUser} />
        </header>
        <main>
          <div className="page-manage__header-image" />
          <ul className="page-manage__nav tabs z-depth-1">
            <li className="tab col s4">
              <NavLink exact to="/user/recipes/create" activeClassName="active">Add</NavLink>
            </li>
            <li className="tab col s4">
              <NavLink exact to="/user/recipes" activeClassName="active">Recipes</NavLink>
            </li>
            <li className="tab col s4">
              <NavLink exact to="/user/favorites" activeClassName="active">Favorites</NavLink>
            </li>
          </ul>
          {
            this.props.children
          }
        </main>
        <Notification notification={this.props.notification} dispatch={this.props.dispatch} />
        <SiteFooter />
      </div>
    );
  }
}
ManageRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ...currentUserPropTypes,
  children: PropTypes.element.isRequired,
  notification: PropTypes.string.isRequired
};

export const mapStateToProps = ({
  auth: { currentUser },
  notification
}) => ({
  currentUser,
  notification
});

export { ManageRecipes as PureManageRecipes };
export default connect(mapStateToProps)(ManageRecipes);
