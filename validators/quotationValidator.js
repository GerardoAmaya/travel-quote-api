// validators/quotationValidator.js
const { check, param } = require('express-validator');
const { Coverage, Price } = require('../models');
const Quotation = require('../models/quotation');

/**
 * Validation rules for quotation creation
 */
exports.createQuotationValidation = [
    check('userId').isInt().withMessage('User ID must be an integer'),
    check('originPlaceId').isInt().withMessage('Origin Place ID must be an integer'),
    check('destinationPlaceId').isInt().withMessage('Destination Place ID must be an integer'),
    check('date').isDate().withMessage('Date must be a valid date'),
    check('passengerCount').isInt({ min: 1 }).withMessage('Passenger count must be an integer greater than 0'),
    check('coverageId').optional().isInt().withMessage('Coverage ID must be an integer')
        .custom(async (value) => {
            const coverage = await Coverage.findByPk(value);
            if (!coverage) {
                throw new Error('Invalid coverage ID');
            }
            return true;
        }),
    check('priceId').optional().isInt().withMessage('Price ID must be an integer')
        .custom(async (value) => {
            const price = await Price.findByPk(value);
            if (!price) {
                throw new Error('Invalid price ID');
            }
            return true;
        })
];

exports.changeQuotationStatusValidation = [
    check('status')
        .not().isEmpty().withMessage('Status is required')
        .isIn(['creada', 'reserva', 'reserva cancelada']).withMessage('Invalid status value'),
];