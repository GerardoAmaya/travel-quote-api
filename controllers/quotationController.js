const { Op } = require("sequelize");
const { sequelize } = require("../models");
const { Quotation, User, Place, Coverage, Price, Vehicle } = require("../models");
const { validationResult } = require('express-validator');
const { createQuotationValidation, changeQuotationStatusValidation} = require('../validators/quotationValidator');

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
            const { userId, originPlaceId, destinationPlaceId, date, passengerCount, coverageId, priceId } = req.body;

            // Verify that the price is associated with the coverage
            const validPrice = await Price.findOne({
                where: {
                    id: priceId,
                    coverageId: coverageId,
                    startDate: { [Op.lte]: date },
                    endDate: { [Op.gte]: date }
                },
                transaction: t
            });

            if (!validPrice) {
                await t.rollback();
                return res.status(400).json({ error: "Price is not associated to Coverage!" });
            }

            // Create the quotation
            const quotation = await Quotation.create({
                userId,
                originPlaceId,
                destinationPlaceId,
                date,
                passengerCount,
                coverageId,
                priceId
            }, { transaction: t });

            await t.commit();
            res.status(201).json(quotation);
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

            // Verify that the status transition is valid based on the current status
            if (quotation.status === 'reserva cancelada') {
                await t.rollback();
                return res.status(400).json({ error: "Cannot change status of a canceled reservation" });
            }

            if (quotation.status === 'creada' && status !== 'reserva') {
                await t.rollback();
                return res.status(400).json({ error: "Invalid status transition from 'creada'" });
            }

            if (quotation.status === 'reserva' && status !== 'reserva cancelada') {
                await t.rollback();
                return res.status(400).json({ error: "Invalid status transition from 'reserva'" });
            }

            // Update the quotation status if the transition is valid
            quotation.status = status;

            // Assign the coverage and price to the quotation if provided in the request
            if (coverageId) {
                quotation.coverageId = coverageId;
            }
            if (priceId) {
                quotation.priceId = priceId;
            }

            await quotation.save({ transaction: t });
            await t.commit();

            res.json(quotation);
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
];
