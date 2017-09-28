import React, { Component } from 'react';

/**
 * @export
 * @class App
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @returns {component} returns a component that matches a provided path
   * @memberof App
   */
  render() {
    return (
      <div className="page page__home">
        <h1 style={{ textAlign: 'center' }}>
          Something Awesome is coming
          <span role="img" aria-label="cool-fire">😎🔥</span>
        </h1>
      </div>
    );
  }
}

export default Home;
