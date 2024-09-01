// validators/priceValidator.js
const { check, param } = require('express-validator');
const { Coverage, Price } = require('../models');

/**
 * Validation rules for price creation
 */
exports.createPriceValidation = [
    check('coverageId').isInt().withMessage('Coverage ID must be an integer')
        .custom(async (value) => {
            const coverage = await Coverage.findByPk(value);
            if (!coverage) {
                throw new Error('Invalid coverage ID');
            }
            return true;
        }),
    check('startDate').isDate().withMessage('Start date must be a valid date'),
    check('endDate').isDate().withMessage('End date must be a valid date'),
    check('amount').isDecimal().withMessage('Amount must be a decimal value')
];

/**
 * Validation rules for updating a price
 */
exports.updatePriceValidation = [
    check('coverageId').optional().isInt().withMessage('Coverage ID must be an integer')
        .custom(async (value) => {
            const coverage = await Coverage.findByPk(value);
            if (!coverage) {
                throw new Error('Invalid coverage ID');
            }
            return true;
        }),
    check('startDate').optional().isDate().withMessage('Start date must be a valid date'),
    check('endDate').optional().isDate().withMessage('End date must be a valid date'),
    check('amount').optional().isDecimal().withMessage('Amount must be a decimal value')
];

/**
 * Validation rule to check if price ID exists
 */
exports.validatePriceId = [
    param('id').isInt().withMessage('Price ID must be an integer')
        .custom(async (value) => {
            const price = await Price.findByPk(value);
            if (!price) {
                throw new Error('Invalid price ID');
            }
            return true;
        })
];
