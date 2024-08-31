// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/vehicles', authMiddleware, verifyAdmin, vehicleController.createVehicle);
router.get('/vehicles', authMiddleware, vehicleController.getVehicles);
router.get('/vehicles/:id', authMiddleware, vehicleController.getVehicleById);
router.put('/vehicles/:id', authMiddleware, verifyAdmin, vehicleController.updateVehicle);
router.delete('/vehicles/:id', authMiddleware, verifyAdmin, vehicleController.deleteVehicle);

module.exports = router;
