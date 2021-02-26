// Imports sequelize for modeling
module.exports = (sequelize, DataTypes) => {
    // New Model/table for menu items
    const MenuItem = sequelize.define('MenuItem', {
        // Giving the MENUITEM model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Description column in database of type STRING for MENUITEM
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 500]
            }
        },
        // Price column in database of type STRING
        price: {
            type: DataTypes.STRING
        },
        // Category column in database for MENUITEM
        category: {
            type: DataTypes.STRING
        },
        // Image column in database for MENUITEM
        img: {
            type: DataTypes.STRING
        }
    });

    return MenuItem;
};
