const { check, param } = require('express-validator');
const { Role } = require('../models');

/**
 * Validation rules for user registration
 */
exports.registerValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Validating roleId
    check('roleId').optional().isInt().withMessage('Role ID must be an integer')
        .custom(async (value) => {
            const role = await Role.findByPk(value);
            if (!role) {
                throw new Error('Invalid role ID');
            }
            return true;
        }),

    // Validating status
    check('status').optional().isIn([0, 1]).withMessage('Status must be 0 (inactive) or 1 (active)')
];

/**
 * Validation rules for user login
 */
exports.loginValidation = [
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required')
];

/**
 * Validation rules for updating a user
 */
exports.updateUserValidation = [
    check('name').optional().not().isEmpty().withMessage('Name cannot be empty if provided'),
    check('email').optional().isEmail().withMessage('Please provide a valid email address if provided'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long if provided'),

    // Validating roleId
    check('roleId').optional().isInt().withMessage('Role ID must be an integer')
        .custom(async (value) => {
            const role = await Role.findByPk(value);
            if (!role) {
                throw new Error('Invalid role ID');
            }
            return true;
        }),

    // Validating status
    check('status').optional().isIn([0, 1]).withMessage('Status must be 0 (inactive) or 1 (active)')
];

/**
 * Validation rule for user ID parameter
 */
exports.validateUserId = [
    param('id').isInt().withMessage('User ID must be a valid integer')
];
