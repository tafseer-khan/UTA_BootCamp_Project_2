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

    return Category;
};
