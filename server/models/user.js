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

    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
  };

  User.authenticate = (email, password, callback) => {
    // console.log(email, password);
    User.findOne({
      where: { email },
    })
      .then((user) => {
        // check if it finds no user
        if (!user) {
          const err = new Error('User not found');
          err.status = 404;
          return callback(err);
        }
        const isMatch = bcrypt.compareSync(password, user.password);

        // check if password matches
        if (isMatch) return callback(null, user);
        return callback();
      })
      .catch(err => callback(err));
  };
  return User;
};
