var bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      // Giving the User model a name of type STRING
      menuName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Menu.associate = (models) => {
      // Associating Users with Menus
      // When an User is deleted, also delete any associated Menus
      Menu.hasMany(models.MenuItem, {
        onDelete: 'cascade',
      });

      Menu.hasMany(models.Category, {
          onDelete: 'cascade'
      });
    };
    
    return Menu;
  };
  