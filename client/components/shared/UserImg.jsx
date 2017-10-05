import React from 'react';

import { userImgPropTypes } from '../../config/proptypes';

const UserImg = ({ user, type }) => {
  const buffer = user.fullname.split(' ');
  const firstChar = buffer[0].charAt(0).toUpperCase();
  const secondChar = buffer[1].charAt(0).toUpperCase();

  return (
    <div className={`user-image ${type}`}>
      {
        !user.imgUrl ?
          <div className="user-image__no-img">
            <span>{firstChar}</span>
            <span>{secondChar}</span>
          </div>
          :
          <img src={user.imgUrl} alt={user.fullname} title={user.fullname} className="user-image__img"/>
      }
    </div>
  );
};

UserImg.propTypes = userImgPropTypes;

export default UserImg;
