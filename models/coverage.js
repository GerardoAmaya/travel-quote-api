module.exports = (sequelize, DataTypes) => {
    const Coverage = sequelize.define('Coverage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        originPlaceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        destinationPlaceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        providerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        durationHours: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Coverage.associate = function (models) {
        Coverage.belongsTo(models.Place, { as: 'originPlace', foreignKey: 'originPlaceId' });
        Coverage.belongsTo(models.Place, { as: 'destinationPlace', foreignKey: 'destinationPlaceId' });
        Coverage.belongsTo(models.Vehicle, { as: 'vehicle', foreignKey: 'vehicleId' });
        Coverage.belongsTo(models.Provider, { as: 'provider', foreignKey: 'providerId' });
    };

    return Coverage;
};
