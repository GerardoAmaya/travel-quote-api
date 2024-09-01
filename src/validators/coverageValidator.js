// validators/coverageValidator.js
const { check, param } = require('express-validator');
const { Place, Vehicle, Provider } = require('../models');

/**
 * Validation rules for creating a coverage
 */
exports.createCoverageValidation = [
    check('originPlaceId').isInt().withMessage('Origin Place ID must be an integer')
        .custom(async (value) => {
            const place = await Place.findByPk(value);
            if (!place) {
                throw new Error('Invalid origin place ID');
            }
            return true;
        }),
    check('destinationPlaceId').isInt().withMessage('Destination Place ID must be an integer')
        .custom(async (value) => {
            const place = await Place.findByPk(value);
            if (!place) {
                throw new Error('Invalid destination place ID');
            }
            return true;
        }),
    check('vehicleId').isInt().withMessage('Vehicle ID must be an integer')
        .custom(async (value) => {
            const vehicle = await Vehicle.findByPk(value);
            if (!vehicle) {
                throw new Error('Invalid vehicle ID');
            }
            return true;
        }),
    check('providerId').isInt().withMessage('Provider ID must be an integer')
        .custom(async (value) => {
            const provider = await Provider.findByPk(value);
            if (!provider) {
                throw new Error('Invalid provider ID');
            }
            return true;
        }),
    check('startTime').isString().withMessage('Start time is required'),
    check('durationHours').isFloat().withMessage('Duration must be a valid number of hours')
];

/**
 * Validation rules for updating a coverage
 */
exports.updateCoverageValidation = [
    check('originPlaceId').optional().isInt().withMessage('Origin Place ID must be an integer')
        .custom(async (value) => {
            const place = await Place.findByPk(value);
            if (!place) {
                throw new Error('Invalid origin place ID');
            }
            return true;
        }),
    check('destinationPlaceId').optional().isInt().withMessage('Destination Place ID must be an integer')
        .custom(async (value) => {
            const place = await Place.findByPk(value);
            if (!place) {
                throw new Error('Invalid destination place ID');
            }
            return true;
        }),
    check('vehicleId').optional().isInt().withMessage('Vehicle ID must be an integer')
        .custom(async (value) => {
            const vehicle = await Vehicle.findByPk(value);
            if (!vehicle) {
                throw new Error('Invalid vehicle ID');
            }
            return true;
        }),
    check('providerId').optional().isInt().withMessage('Provider ID must be an integer')
        .custom(async (value) => {
            const provider = await Provider.findByPk(value);
            if (!provider) {
                throw new Error('Invalid provider ID');
            }
            return true;
        }),
    check('startTime').optional().isString().withMessage('Start time is required'),
    check('durationHours').optional().isFloat().withMessage('Duration must be a valid number of hours')
];

/**
 * Validation rule for coverage ID parameter
 */
exports.validateCoverageId = [
    param('id').isInt().withMessage('Coverage ID must be a valid integer')
];
