const { User, Role } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation, updateUserValidation, validateUserId } = require('../validators/userValidator');

/**
 * Register a new user
*/
exports.register = [
    registerValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, roleId } = req.body;
            const user = await User.create({ name, email, password, roleId, status: 1 });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Login a user
 */
exports.login = [
    loginValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Use the JWT_SECRET from the .env file
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Get all users
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name', 'description']
            }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get a user by ID
 */
exports.getUserById = [
    validateUserId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['name', 'description']
                }]
            });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Update a user by ID
 */
exports.updateUser = [
    updateUserValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, status, roleId } = req.body;
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.status = status || user.status;
            user.roleId = roleId || user.roleId;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            await user.save();
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Deactivate a user by ID
 */
exports.deactivateUser = [
    validateUserId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.status = 0;
            await user.save();

            res.json({ message: "User deactivated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Activate a user by ID
 */
exports.activateUser = [
    validateUserId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.status = 1;
            await user.save();

            res.json({ message: "User activated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

/**
 * Delete a user by ID
 */
exports.deleteUser = [
    validateUserId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            await user.destroy();

            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];