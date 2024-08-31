// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/categories', authMiddleware, verifyAdmin, categoryController.createCategory);
router.get('/categories', authMiddleware, categoryController.getCategories);
router.get('/categories/:id', authMiddleware, categoryController.getCategoryById);
router.put('/categories/:id', authMiddleware, verifyAdmin, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, verifyAdmin, categoryController.deleteCategory);

module.exports = router;
