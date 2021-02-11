var bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Giving the User model a name of type STRING
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      lastName:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email:   {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 20]
        }
      },
    });

    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };

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
  