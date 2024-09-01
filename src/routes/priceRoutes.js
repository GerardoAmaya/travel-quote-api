// routes/priceRoutes.js
const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/prices', authMiddleware, verifyAdmin, priceController.createPrice);
router.get('/prices', authMiddleware, priceController.getPrices);
router.get('/prices/:id', authMiddleware, priceController.getPriceById);
router.put('/prices/:id', authMiddleware, verifyAdmin, priceController.updatePrice);
router.delete('/prices/:id', authMiddleware, verifyAdmin, priceController.deletePrice);

module.exports = router;
