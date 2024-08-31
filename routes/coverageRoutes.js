// routes/coverageRoutes.js
const express = require('express');
const router = express.Router();
const coverageController = require('../controllers/coverageController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/coverages', authMiddleware, verifyAdmin, coverageController.createCoverage);
router.get('/coverages', authMiddleware, coverageController.getCoverages);
router.get('/coverages/:id', authMiddleware, coverageController.getCoverageById);
router.put('/coverages/:id', authMiddleware, verifyAdmin, coverageController.updateCoverage);
router.delete('/coverages/:id', authMiddleware, verifyAdmin, coverageController.deleteCoverage);

module.exports = router;
