import React from 'react';
import ReactTooltip from 'react-tooltip';

import { userImgPropTypes } from '../../config/proptypes';

const UserImg = ({ user, type }) => {
  const buffer = user.fullname.split(' ');
  let firstChar;
  let secondChar;

  if (buffer.length > 1) {
    firstChar = buffer[0].charAt(0).toUpperCase();
    secondChar = buffer[1].charAt(0).toUpperCase();
  } else {
    firstChar = buffer[0].charAt(0).toUpperCase();
  }

  return (
    <div
      className={`user-image ${type}`}
      data-tip={user.fullname}
      data-for={`username-${type}`}
    >
      {
        type === 'inRecipeCard' && <ReactTooltip id="username-inRecipeCard" place="right" effect="solid" />
      }

      {
        !user.imgUrl ?
          <div className="user-image__no-img">
            <span>{firstChar}</span>
            <span>{secondChar}</span>
          </div>
          :
          <img src={user.imgUrl} alt={user.fullname} title={user.fullname} className="user-image__img" />
      }
    </div>
  );
};

UserImg.propTypes = userImgPropTypes;

export default UserImg;
