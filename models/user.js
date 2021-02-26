var bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Giving the User model a first name of type STRING
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Giving the User model a last name of type STRING
      lastName:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Giving the User model a email of type STRING
      email:   {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Giving the User model a password of type STRING
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 20]
        }
      },
    });
    // Compares and validates password with the encrypted password
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };
    // Before password is created the password is encrypted
    User.addHook("beforeCreate", function(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
  
    User.associate = (models) => {
      // Associating Users with Menus
      // When an User is deleted, also delete any associated Menus
      User.hasMany(models.Menu, {
        onDelete: 'cascade',
      });
    };
    
    return User;
  };
  