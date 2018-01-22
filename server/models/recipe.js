module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Recipe name can not be empty'
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'recipe description can not be empty'
        }
      }
    },
    img_url: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'recipe img url can not be empty'
        }
      }
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      validate: {
        notEmpty: {
          args: true,
          msg: 'recipe ingredients can not be empty'
        }
      }
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notEmpty: {
          args: true,
          msg: 'recipe instructions can not be empty'
        }
      }
    },
    upVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    favoriteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
    });

    Recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId',
      as: 'votes',
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });

    Recipe.hasMany(models.View, {
      foreignKey: 'recipeId',
      as: 'views',
    });
  };
  return Recipe;
};
