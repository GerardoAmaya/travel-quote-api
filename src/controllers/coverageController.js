// controllers/coverageController.js
const { Coverage, Place, Vehicle, Provider } = require("../models");
const { validationResult } = require('express-validator');
const { createCoverageValidation, updateCoverageValidation, validateCoverageId } = require('../validators/coverageValidator');

/**
 * Create a new coverage
 */
exports.createCoverage = [
    createCoverageValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { originPlaceId, destinationPlaceId, vehicleId, providerId, startTime, durationHours } = req.body;
            const coverage = await Coverage.create({ originPlaceId, destinationPlaceId, vehicleId, providerId, startTime, durationHours });
            res.status(201).json(coverage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all coverages
 */
exports.getCoverages = async (req, res) => {
    try {
        const coverages = await Coverage.findAll({
            include: [
                {
                    model: Place,
                    as: 'originPlace',
                    attributes: ['name']
                },
                {
                    model: Place,
                    as: 'destinationPlace',
                    attributes: ['name']
                },
                {
                    model: Vehicle,
                    as: 'vehicle',
                    attributes: ['name']
                },
                {
                    model: Provider,
                    as: 'provider',
                    attributes: ['name']
                }
            ]
        });
        res.json(coverages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a coverage by ID
 */
exports.getCoverageById = [
    validateCoverageId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const coverage = await Coverage.findByPk(req.params.id, {
                include: [
                    {
                        model: Place,
                        as: 'originPlace',
                        attributes: ['name']
                    },
                    {
                        model: Place,
                        as: 'destinationPlace',
                        attributes: ['name']
                    },
                    {
                        model: Vehicle,
                        as: 'vehicle',
                        attributes: ['name']
                    },
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['name']
                    }
                ]
            });
            if (!coverage) {
                return res.status(404).json({ error: "Coverage not found" });
            }
            res.json(coverage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a coverage by ID
 */
exports.updateCoverage = [
    validateCoverageId,
    updateCoverageValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { originPlaceId, destinationPlaceId, vehicleId, providerId, startTime, durationHours } = req.body;
            const coverage = await Coverage.findByPk(req.params.id);
            if (!coverage) {
                return res.status(404).json({ error: "Coverage not found" });
            }

            coverage.originPlaceId = originPlaceId || coverage.originPlaceId;
            coverage.destinationPlaceId = destinationPlaceId || coverage.destinationPlaceId;
            coverage.vehicleId = vehicleId || coverage.vehicleId;
            coverage.providerId = providerId || coverage.providerId;
            coverage.startTime = startTime || coverage.startTime;
            coverage.durationHours = durationHours || coverage.durationHours;

            await coverage.save();
            res.json(coverage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a coverage by ID
 */
exports.deleteCoverage = [
    validateCoverageId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const coverage = await Coverage.findByPk(req.params.id);
            if (!coverage) {
                return res.status(404).json({ error: "Coverage not found" });
            }

            await coverage.destroy();
            res.json({ message: "Coverage deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
