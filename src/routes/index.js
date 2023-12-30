const express = require('express');

const router = express.Router();// this Router is provided by express


const v1ApiRoutes = require('./v1/index')

router.use('/v1',v1ApiRoutes);

module.exports = router;
