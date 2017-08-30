module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: true,
      unique: true,
      defaultValue: 'username',
      validation: {
        max: 15,
      },
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      validation: {
        isEmail: true,
      },
      type: DataTypes.STRING,
    },
    fullname: {
      allowNull: false,
      validation: {
        max: 50,
        isAlpha: true,
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      validation: {
        min: 6,
      },
      type: DataTypes.STRING
    },
  });

  User.associate = (models) => {
    User.hasMany(models.recipe, {
      foreignKey: 'owner',
    });
  };

  return User;
};
