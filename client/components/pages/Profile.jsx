import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentUserPropTypes, notificationPropTypes } from '../../config/proptypes';
import { updateUserProfile } from '../../actions/userProfile';
import defaultConfig from '../../config/default';
import imageUpload from '../../utils/imageUpload';

import ConnectedSiteNav from '../shared/SiteNav.jsx';
import Preloader from '../shared/Preloader.jsx';
import SiteFooter from '../shared/SiteFooter';
import ImageUpload from '../shared/ImageUpload';
import Notification from '../shared/Notification';
import SubmitButton from '../shared/SubmitButton';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.currentUser,
      // pending, started, failed, completed
      imageUploadProgress: 'pending',
      submitLoading: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser.id !== 0) {
      this.setState({ user: newProps.currentUser });
    }
  }

  imageUploadHandler = (imageInput) => {
    imageUpload.call(
      this,
      imageInput,
      `users/${this.props.currentUser.id}--${Date.now()}`,
      (downloadURL) => {
        const user = Object.assign({}, this.state.user);
        user.imgUrl = downloadURL;
        imageInput.disabled = false;
        this.setState({ user, imageUploadProgress: 'completed' });
      }
    );
  }

  handleUpdateProfile = () => {
    this.setState({ submitLoading: true });
    this.props.dispatch(updateUserProfile(this.state.user))
      .then(() => this.setState({ submitLoading: false }));
  }

  handleOnChange = (event, type) => {
    const user = Object.assign({}, this.state.user);
    user[type] = event.target.value;
    this.setState({ user });
  }

  render() {
    const { currentUser } = this.props;

    const {
      fullname,
      email,
    } = this.state.user;

    return (
      this.props.isFetching ?
        <Preloader />
        :
        <div className="page page__profile">
          <header className="site-header">
            <ConnectedSiteNav currentUser={currentUser} />
          </header>
          <main>
            <div className="container z-depth-1">
              <section className="profile">
                <h3 className="profile__title">Profile</h3>
                <div className="profile__body">
                  <ImageUpload
                    imgUrl={this.state.user.imgUrl}
                    className="profile__image"
                    altText={fullname}
                    imageUploadHandler={this.imageUploadHandler}
                    imageUploadProgress={this.state.imageUploadProgress}
                    defaultImgUrl={defaultConfig.userImgUrl}
                  />
                  <div className="profile__details">
                    <label htmlFor="fullname">
                      Name
                      <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={e => this.handleOnChange(e, 'fullname')}
                      />
                    </label>
                    <label htmlFor="email">
                      Email
                      <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={e => this.handleOnChange(e, 'email')}
                      />
                    </label>
                    <SubmitButton
                      submitText="Save Changes"
                      handleClick={this.handleUpdateProfile}
                      submitLoading={this.state.submitLoading}
                    />
                  </div>
                </div>

              </section>
            </div>
          </main>
          <Notification
            dispatch={this.props.dispatch}
            notification={this.props.notification}
          />
          <SiteFooter />
        </div>
    );
  }
}

Profile.propTypes = {
  ...currentUserPropTypes,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ...notificationPropTypes
};

export const mapStateToProps = ({
  isFetching,
  auth: { currentUser },
  notification
}) => ({
  currentUser,
  isFetching,
  notification
});

export { Profile as PureProfile };
export default connect(mapStateToProps)(Profile);
