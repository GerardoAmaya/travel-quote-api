// models/vehicle.js
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacityStandard: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacityPremium: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        providerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Providers',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        timestamps: true,
    });

    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
        Vehicle.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    };

    return Vehicle;
};
