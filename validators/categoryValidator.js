const { check } = require('express-validator');
const { Category } = require('../models');

/**
 * Validation rules for category creation
 */
exports.createCategoryValidation = [
    check('name').not().isEmpty().withMessage('Name is required')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { name: value } });
            if (category) {
                throw new Error('Category with this name already exists');
            }
            return true;
        })
];

/**
 * Validation rules for updating a category
 */
exports.updateCategoryValidation = [
    check('name').optional().not().isEmpty().withMessage('Name cannot be empty if provided')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { name: value } });
            if (category) {
                throw new Error('Category with this name already exists');
            }
            return true;
        })
];

/**
 * Validation rule to check if category ID exists
 */
exports.validateCategoryId = [
    check('id').isInt().withMessage('Category ID must be an integer')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) {
                throw new Error('Invalid category ID');
            }
            return true;
        })
];
