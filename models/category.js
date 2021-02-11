module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        // Giving the User model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Category.associate = (models) => {
        // Associating Users with Menus
        // When an User is deleted, also delete any associated Menus
        Category.hasMany(models.MenuItem, {
            onDelete: 'cascade'
        });
    };

    return Category;
};
