const { Provider } = require("../models");
const { validationResult } = require('express-validator');
const { createProviderValidation, updateProviderValidation, validateProviderId } = require('../validators/providerValidator');

/**
 * Create a new provider
 */
exports.createProvider = [
    createProviderValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const provider = await Provider.create({ name });
            res.status(201).json(provider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all providers
 */
exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a provider by ID
 */
exports.getProviderById = [
    validateProviderId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const provider = await Provider.findByPk(req.params.id);
            if (!provider) {
                return res.status(404).json({ error: "Provider not found" });
            }
            res.json(provider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a provider by ID
 */
exports.updateProvider = [
    validateProviderId,
    updateProviderValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const provider = await Provider.findByPk(req.params.id);
            if (!provider) {
                return res.status(404).json({ error: "Provider not found" });
            }

            provider.name = name || provider.name;
            await provider.save();
            res.json(provider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a provider by ID
 */
exports.deleteProvider = [
    validateProviderId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const provider = await Provider.findByPk(req.params.id);
            if (!provider) {
                return res.status(404).json({ error: "Provider not found" });
            }

            await provider.destroy();
            res.json({ message: "Provider deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
