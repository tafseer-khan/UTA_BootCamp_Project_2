module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      // Giving the Menu model a name of type STRING
      menuName: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        },
        allowNull: false,
      },
      // Column for menu for qr code of type TEXT
      qr:{
        type: DataTypes.TEXT
      }
    });
  
    Menu.associate = (models) => {
      // Associating Users with Menus
      // When an User is deleted, also delete any associated Menus
      Menu.hasMany(models.MenuItem, {
        onDelete: 'cascade',
      });
      // Each menu will be associated with one user
      Menu.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    
    return Menu;
  };
  