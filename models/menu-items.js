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
                len: [10, 500]
            }
        },
        price: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        }
    });

    return MenuItem;
};
