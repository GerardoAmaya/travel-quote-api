const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/quotations', authMiddleware, quotationController.createQuotation);
// router.get('/quotations', authMiddleware, quotationController.getQuotations);
// router.get('/quotations/:id', authMiddleware, quotationController.getQuotationById);
// router.put('/quotations/:id', authMiddleware, quotationController.updateQuotation);
// router.delete('/quotations/:id', authMiddleware, quotationController.deleteQuotation);
router.put('/quotations/:id/status', authMiddleware, quotationController.changeQuotationStatus);

module.exports = router;
