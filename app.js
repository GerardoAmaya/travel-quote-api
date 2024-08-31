// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const placeRoutes = require('./routes/placeRoutes');
const coverageRoutes = require('./routes/coverageRoutes');
const priceRoutes = require('./routes/priceRoutes');

app.use(express.json());

app.use('/api',
    userRoutes,
    providerRoutes,
    categoryRoutes,
    vehicleRoutes,
    placeRoutes,
    coverageRoutes,
    priceRoutes
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
