// controllers/vehicleController.js
const { Vehicle, Provider, Category } = require("../models");
const { validationResult } = require('express-validator');
const { createVehicleValidation, updateVehicleValidation, validateVehicleId } = require('../validators/vehicleValidator');

/**
 * Create a new vehicle
 */
exports.createVehicle = [
    createVehicleValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, capacity, providerId, categoryId } = req.body;
            const vehicle = await Vehicle.create({ name, capacity, providerId, categoryId });
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all vehicles
 */
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            include: [
                {
                    model: Provider,
                    as: 'provider',
                    attributes: ['name']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a vehicle by ID
 */
exports.getVehicleById = [
    validateVehicleId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const vehicle = await Vehicle.findByPk(req.params.id, {
                include: [
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['name']
                    },
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name']
                    }
                ]
            });
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }
            res.json(vehicle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a vehicle by ID
 */
exports.updateVehicle = [
    validateVehicleId,
    updateVehicleValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, capacity, providerId, categoryId } = req.body;
            const vehicle = await Vehicle.findByPk(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            vehicle.name = name || vehicle.name;
            vehicle.capacity = capacity || vehicle.capacity;
            vehicle.providerId = providerId || vehicle.providerId;
            vehicle.categoryId = categoryId || vehicle.categoryId;

            await vehicle.save();
            res.json(vehicle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a vehicle by ID
 */
exports.deleteVehicle = [
    validateVehicleId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const vehicle = await Vehicle.findByPk(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            await vehicle.destroy();
            res.json({ message: "Vehicle deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
