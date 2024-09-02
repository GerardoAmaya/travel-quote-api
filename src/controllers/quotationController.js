const { Op } = require("sequelize");
const { sequelize } = require("../models");
const { Quotation, User, Place, Coverage, Price, Vehicle } = require("../models");
const { validationResult } = require('express-validator');
const { createQuotationValidation, changeQuotationStatusValidation, getQuotationsByDateRangeValidation } = require('../validators/quotationValidator');

/**
 * Create a new quotation
 * If the price is not associated with the coverage, return an error message
 * If the quotation is created successfully, return the created quotation with column status "created"
 */
exports.createQuotation = [
    createQuotationValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const t = await sequelize.transaction();
        try {
            const { userId, originPlaceId, destinationPlaceId, date, passengerCount } = req.body;

            const formattedDate = new Date(date);

            // Create a new quotation with the provided details
            const quotation = await Quotation.create({
                userId,
                originPlaceId,
                destinationPlaceId,
                date: formattedDate,
                passengerCount,
                status: 'creada'
            }, { transaction: t });

            const coverages = await Coverage.findAll({
                where: {
                    originPlaceId,
                    destinationPlaceId
                },
                include: [
                    {
                        model: Price,
                        as: 'prices',
                        where: {
                            startDate: { [Op.lte]: formattedDate },
                            endDate: { [Op.gte]: formattedDate }
                        },
                        attributes: ['id', 'amount']
                    },
                    {
                        model: Vehicle,
                        as: 'vehicle',
                        attributes: ['name', 'capacity']
                    }
                ],
                transaction: t
            });

            await t.commit();
            res.status(201).json({
                quotationId: quotation.id, // Return the ID of the created quotation
                coverages // Return the available coverages for the quotation
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
];


/**
 * Change the status of a quotation
 */
exports.changeQuotationStatus = [
    changeQuotationStatusValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { status, coverageId, priceId } = req.body;

            const quotation = await Quotation.findByPk(id, { transaction: t });
            if (!quotation) {
                await t.rollback();
                return res.status(404).json({ error: "Quotation not found" });
            }

            // Validations for status transitions
            // We can't change the status of a canceled reservation
            if (quotation.status === 'reserva cancelada') {
                await t.rollback();
                return res.status(400).json({ error: "Cannot change status of a canceled reservation" });
            }

            // We can't change the status from 'creada' to any other status except 'reserva'
            if (quotation.status === 'creada' && status !== 'reserva') {
                await t.rollback();
                return res.status(400).json({ error: "Invalid status transition from 'creada'" });
            }

            // We can't change the status from 'reserva' to any other status except 'reserva cancelada'
            if (quotation.status === 'reserva' && status !== 'reserva cancelada') {
                await t.rollback();
                return res.status(400).json({ error: "Invalid status transition from 'reserva'" });
            }

            // If the status is changed to 'reserva', we need to check if there is enough capacity
            if (status === 'reserva') {
                const coverage = await Coverage.findByPk(coverageId, {
                    include: [{
                        model: Vehicle,
                        as: 'vehicle',
                        attributes: ['capacity']
                    }],
                    transaction: t
                });

                if (!coverage) {
                    await t.rollback();
                    return res.status(404).json({ error: "Coverage not found" });
                }

                // Get the total number of passengers reserved for the coverage
                const totalPassengersReserved = await Quotation.sum('passengerCount', {
                    where: {
                        coverageId: coverageId,
                        status: 'reserva'
                    },
                    transaction: t
                });

                const remainingCapacity = coverage.vehicle.capacity - totalPassengersReserved;
                if (quotation.passengerCount > remainingCapacity) {
                    await t.rollback();
                    return res.status(400).json({ error: "Not enough capacity for this reservation" });
                }

                // Fetch the price associated with the coverage
                const price = await Price.findOne({
                    where: {
                        coverageId: coverageId,
                        startDate: { [Op.lte]: quotation.date },
                        endDate: { [Op.gte]: quotation.date }
                    },
                    transaction: t
                });

                if (!price) {
                    await t.rollback();
                    return res.status(404).json({ error: "Price not found for the selected coverage" });
                }

                // Update the quotation with the coverage and price IDs
                quotation.coverageId = coverageId;
                // This is the price that the user will pay for the reservation
                quotation.priceId = price.id;
            }

            // Update the status of the quotation
            quotation.status = status;

            await quotation.save({ transaction: t });
            await t.commit();

            res.json(quotation);
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get quotations for the logged-in user
 */
exports.getQuotationsForLoggedInUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const quotations = await Quotation.findAll({
            where: {
                userId: userId
            },
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
                    model: Coverage,
                    attributes: ['startTime', 'durationHours']
                },
                {
                    model: Price,
                    attributes: ['amount']
                }
            ]
        });

        res.json(quotations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get quotations within a date range
 */
exports.getQuotationsByDateRange = [
    getQuotationsByDateRangeValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { startDate, endDate } = req.query;

            const quotations = await Quotation.findAll({
                where: {
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email']
                    },
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
                        model: Coverage,
                        attributes: ['startTime', 'durationHours']
                    },
                    {
                        model: Price,
                        attributes: ['amount']
                    }
                ]
            });

            res.json(quotations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a quotation by ID
 */
exports.deleteQuotationById = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const t = await sequelize.transaction();
        try {
            const { id } = req.params;

            const quotation = await Quotation.findByPk(id, { transaction: t });
            if (!quotation) {
                await t.rollback();
                return res.status(404).json({ error: "Quotation not found" });
            }

            await quotation.destroy({ transaction: t });
            await t.commit();

            res.json({ message: "Quotation deleted successfully" });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
];
