const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/quotations', authMiddleware, quotationController.createQuotation);
router.delete('/quotations/:id', authMiddleware, quotationController.deleteQuotationById);
router.put('/quotations/:id/status', authMiddleware, quotationController.changeQuotationStatus);
router.get('/quotations/my-quotations', authMiddleware, quotationController.getQuotationsForLoggedInUser);
router.get('/quotations/date-range', authMiddleware, quotationController.getQuotationsByDateRange);

module.exports = router;
