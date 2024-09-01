// models/quotation.js
module.exports = (sequelize, DataTypes) => {
    const Quotation = sequelize.define('Quotation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        originPlaceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destinationPlaceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        passengerCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coverageId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        priceId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'creada'
        }
    }, {
        timestamps: true,
    });

    Quotation.associate = function(models) {
        Quotation.belongsTo(models.User, { foreignKey: 'userId' });
        Quotation.belongsTo(models.Place, { as: 'originPlace', foreignKey: 'originPlaceId' });
        Quotation.belongsTo(models.Place, { as: 'destinationPlace', foreignKey: 'destinationPlaceId' });
        Quotation.belongsTo(models.Coverage, { foreignKey: 'coverageId' });
        Quotation.belongsTo(models.Price, { foreignKey: 'priceId' });
    };

    return Quotation;
};
