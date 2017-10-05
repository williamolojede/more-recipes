module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      // the reason for this becasue custom allownull message isn't available yet in sequelize
      // https://github.com/sequelize/sequelize/issues/1500
      defaultValue: '',
      validate: {
        notEmpty: {
          args: true,
          msg: 'the content of your review can not be empty'
        }
      },
    }
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
