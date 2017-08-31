import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: true,
      unique: true,
      validate: {
        max: 15,
      },
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      type: DataTypes.STRING,
    },
    fullname: {
      allowNull: false,
      validate: {
        max: 50,
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(password) {
        const hash = bcrypt.hashSync(password, 10);
        this.setDataValue('password', hash);
      }
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'owner',
      as: 'recipes',
    });
  };
  return User;
};
