// controllers/placeController.js
const { Place } = require("../models");
const { validationResult } = require('express-validator');
const { createPlaceValidation, updatePlaceValidation, validatePlaceId } = require('../validators/placeValidator');

/**
 * Create a new place
 */
exports.createPlace = [
    createPlaceValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const place = await Place.create({ name });
            res.status(201).json(place);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all places
 */
exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.findAll();
        res.json(places);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a place by ID
 */
exports.getPlaceById = [
    validatePlaceId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const place = await Place.findByPk(req.params.id);
            if (!place) {
                return res.status(404).json({ error: "Place not found" });
            }
            res.json(place);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a place by ID
 */
exports.updatePlace = [
    validatePlaceId,
    updatePlaceValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const place = await Place.findByPk(req.params.id);
            if (!place) {
                return res.status(404).json({ error: "Place not found" });
            }

            place.name = name || place.name;
            await place.save();
            res.json(place);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a place by ID
 */
exports.deletePlace = [
    validatePlaceId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const place = await Place.findByPk(req.params.id);
            if (!place) {
                return res.status(404).json({ error: "Place not found" });
            }

            await place.destroy();
            res.json({ message: "Place deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
