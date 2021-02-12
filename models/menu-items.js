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

<<<<<<< HEAD
=======

>>>>>>> 201c7db16d7aeaff5e2e7ee0bcb4cab4373eb06e
    return MenuItem;
};
