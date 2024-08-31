// models/place.js
module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Place', {
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

    return Place;
};
