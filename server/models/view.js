module.exports = (sequelize) => {
  const View = sequelize.define('View', {});

  View.associate = (models) => {
    View.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    View.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return View;
};
