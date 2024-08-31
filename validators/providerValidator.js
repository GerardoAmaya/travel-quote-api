const { check, param } = require('express-validator');

/**
 * Validation rules for creating a provider
 */
exports.createProviderValidation = [
    check('name').not().isEmpty().withMessage('Name is required')
];

/**
 * Validation rules for updating a provider
 */
exports.updateProviderValidation = [
    check('name').optional().not().isEmpty().withMessage('Name cannot be empty if provided')
];

/**
 * Validation rule for provider ID parameter
 */
exports.validateProviderId = [
    param('id').isInt().withMessage('Provider ID must be a valid integer')
];
