const { check } = require('express-validator');
const { Place } = require('../models');

/**
 * Validation rules for place creation
 */
exports.createPlaceValidation = [
    check('name').not().isEmpty().withMessage('Name is required')
        .custom(async (value) => {
            const place = await Place.findOne({ where: { name: value } });
            if (place) {
                throw new Error('Place with this name already exists');
            }
            return true;
        })
];

/**
 * Validation rules for updating a place
 */

exports.updatePlaceValidation = [
    check('name').optional().not().isEmpty().withMessage('Name cannot be empty if provided')
        .custom(async (value) => {
            const place = await Place.findOne({ where: { name: value } });
            if (place) {
                throw new Error('Place with this name already exists');
            }
            return true;
        })
];

/**
 * Validation rule to check if place ID exists
 */

exports.validatePlaceId = [
    check('id').isInt().withMessage('Place ID must be an integer')
        .custom(async (value) => {
            const place = await Place.findByPk(value);
            if (!place) {
                throw new Error('Invalid place ID');
            }
            return true;
        })
];