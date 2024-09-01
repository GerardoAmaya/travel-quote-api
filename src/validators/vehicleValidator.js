// validators/vehicleValidator.js
const { check, body } = require('express-validator');
const { Provider, Category, Vehicle } = require('../models');

/**
 * Validation rules for creating a vehicle
 */
exports.createVehicleValidation = [
    check('name').not().isEmpty().withMessage('Vehicle name is required'),
    check('capacity').isInt({ min: 1 }).withMessage('Capacity must be an integer greater than 0'),

    // Validating providerId
    check('providerId').isInt().withMessage('Provider ID must be an integer')
        .custom(async (value) => {
            const provider = await Provider.findByPk(value);
            if (!provider) {
                throw new Error('Invalid provider ID');
            }
            return true;
        }),

    // Validating categoryId
    check('categoryId').isInt().withMessage('Category ID must be an integer')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) {
                throw new Error('Invalid category ID');
            }
            return true;
        })
];

/**
 * Validation rules for updating a vehicle
 */
exports.updateVehicleValidation = [
    check('name').optional().not().isEmpty().withMessage('Vehicle name cannot be empty if provided'),
    check('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be an integer greater than 0 if provided'),

    // Validating providerId
    check('providerId').optional().isInt().withMessage('Provider ID must be an integer')
        .custom(async (value) => {
            const provider = await Provider.findByPk(value);
            if (!provider) {
                throw new Error('Invalid provider ID');
            }
            return true;
        }),

    // Validating categoryId
    check('categoryId').optional().isInt().withMessage('Category ID must be an integer')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) {
                throw new Error('Invalid category ID');
            }
            return true;
        })
];

/**
 * Validation for vehicle ID in the request parameters
 */
exports.validateVehicleId = [
    check('id').isInt().withMessage('Vehicle ID must be an integer')
        .custom(async (value) => {
            const vehicle = await Vehicle.findByPk(value);
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            return true;
        })
];
