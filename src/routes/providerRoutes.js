// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/providers', authMiddleware, verifyAdmin, providerController.createProvider);
router.get('/providers', authMiddleware, providerController.getProviders);
router.get('/providers/:id', authMiddleware, providerController.getProviderById);
router.put('/providers/:id', authMiddleware, verifyAdmin, providerController.updateProvider);
router.delete('/providers/:id', authMiddleware, verifyAdmin, providerController.deleteProvider);

module.exports = router;
