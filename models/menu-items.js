const { foreign_key } = require("inflection");

module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        // Giving the User model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [15, 500]
            }
        },
        category: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        }
    });

    MenuItem.associate = (models) => {
        // Associating Users with Menus
        // When an User is deleted, also delete any associated Menus
        MenuItem.hasOne(models.Category, {
            onDelete: 'cascade',
            foreignKey: {
                allowNull: false,
            }
        });
    };

    return MenuItem;
};
