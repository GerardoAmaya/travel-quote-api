const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, verifyAdmin, userController.deleteUser);
router.put('/users/deactivate/:id', authMiddleware, verifyAdmin, userController.deactivateUser);
router.put('/users/activate/:id', authMiddleware, verifyAdmin, userController.activateUser);

module.exports = router;
