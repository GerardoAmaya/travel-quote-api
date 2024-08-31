const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

// This middleware function will verify if the user is authenticated.
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};


// This middleware function will verify if the user is an admin.
exports.verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name']
            }]
        });

        if (!user || user.role.name !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

