// controllers/categoryController.js
const { Category } = require("../models");
const { validationResult } = require('express-validator');
const { createCategoryValidation, updateCategoryValidation, validateCategoryId } = require('../validators/categoryValidator');

/**
 * Create a new category
 */
exports.createCategory = [
    createCategoryValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all categories
 */
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a category by ID
 */
exports.getCategoryById = [
    validateCategoryId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a category by ID
 */
exports.updateCategory = [
    validateCategoryId,
    updateCategoryValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            category.name = name || category.name;
            await category.save();
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a category by ID
 */
exports.deleteCategory = [
    validateCategoryId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            await category.destroy();
            res.json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
