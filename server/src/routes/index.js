const express = require('express');
const router = express.Router();

const fitnessRoutes = require('./fitness');

router.use(fitnessRoutes);

module.exports = router;
