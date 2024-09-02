// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const providerRoutes = require('./src/routes/providerRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');
const placeRoutes = require('./src/routes/placeRoutes');
const coverageRoutes = require('./src/routes/coverageRoutes');
const priceRoutes = require('./src/routes/priceRoutes');
const quotationRoutes = require('./src/routes/quotationRoutes');

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

app.use('/api',
    userRoutes,
    providerRoutes,
    categoryRoutes,
    vehicleRoutes,
    placeRoutes,
    coverageRoutes,
    priceRoutes,
    quotationRoutes
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
