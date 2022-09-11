const express = require('express');
const router = express.Router();
const locationsCtrl = require('../../controllers/api/locations');

// POST /api/locations
router.post('/', locationsCtrl.createLocation);

module.exports = router;