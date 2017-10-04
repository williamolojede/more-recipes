import React from 'react';

const ReviewsList = () => (
  <li className="review__card card">
    <div className="card-image">
      <img src="https://roadwaytravels.com/img/userDefaultIcon.png" alt="usr-avatar" />
      <h5 className="card-title">Tayelolu Johnson</h5>
    </div>
    <div className="card-content">
      <p>
        It kills me how people go in and mutilate a perfectly good recipe. Then you have bad reviews and more mutilations. I read these reviews and decided I'd make the recipe just as it calls and I recommend not changing a thing (except maybe adding 1/2 tsp of vanilla to your egg mixture).
      </p>
    </div>
  </li>
);

export default ReviewsList;
