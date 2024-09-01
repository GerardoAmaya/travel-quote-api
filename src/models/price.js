// models/price.js
module.exports = (sequelize, DataTypes) => {
    const Price = sequelize.define('Price', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coverageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Coverages',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true,
    });

    Price.associate = function (models) {
        Price.belongsTo(models.Coverage, { foreignKey: 'coverageId', as: 'coverage' });
    };

    return Price;
};
