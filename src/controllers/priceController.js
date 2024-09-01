// controllers/priceController.js
const { Price, Coverage } = require("../models");
const { validationResult } = require('express-validator');
const { createPriceValidation, updatePriceValidation, validatePriceId } = require('../validators/priceValidator');

/**
 * Create a new price
 */
exports.createPrice = [
    createPriceValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { coverageId, startDate, endDate, amount } = req.body;
            const price = await Price.create({ coverageId, startDate, endDate, amount });
            res.status(201).json(price);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all prices
 */
exports.getPrices = async (req, res) => {
    try {
        const prices = await Price.findAll({
            include: [{
                model: Coverage,
                as: 'coverage',
                attributes: ['id']
            }]
        });
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a price by ID
 */
exports.getPriceById = [
    validatePriceId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const price = await Price.findByPk(req.params.id, {
                include: [{
                    model: Coverage,
                    as: 'coverage',
                    attributes: ['id']
                }]
            });
            if (!price) {
                return res.status(404).json({ error: "Price not found" });
            }
            res.json(price);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a price by ID
 */
exports.updatePrice = [
    validatePriceId,
    updatePriceValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { coverageId, startDate, endDate, amount } = req.body;
            const price = await Price.findByPk(req.params.id);
            if (!price) {
                return res.status(404).json({ error: "Price not found" });
            }

            price.coverageId = coverageId || price.coverageId;
            price.startDate = startDate || price.startDate;
            price.endDate = endDate || price.endDate;
            price.amount = amount || price.amount;

            await price.save();
            res.json(price);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a price by ID
 */
exports.deletePrice = [
    validatePriceId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const price = await Price.findByPk(req.params.id);
            if (!price) {
                return res.status(404).json({ error: "Price not found" });
            }

            await price.destroy();
            res.json({ message: "Price deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
