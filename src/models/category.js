// models/category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: true,
    });

    Category.associate = function (models) {
        Category.hasMany(models.Vehicle, {
            foreignKey: 'categoryId',
            as: 'vehicles'
        });
    };

    return Category;
};
