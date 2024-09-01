const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/places', authMiddleware, verifyAdmin, placeController.createPlace);
router.get('/places', authMiddleware, placeController.getPlaces);
router.get('/places/:id', authMiddleware, placeController.getPlaceById);
router.put('/places/:id', authMiddleware, verifyAdmin, placeController.updatePlace);
router.delete('/places/:id', authMiddleware, verifyAdmin, placeController.deletePlace);

module.exports = router;
