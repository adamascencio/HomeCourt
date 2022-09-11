const express = require('express');
const router = express.Router();
const locationsCtrl = require('../../controllers/api/locations');

// POST /api/locations
router.post('/', locationsCtrl.createLocation);

// POST /api/locations/runs
router.post('/runs', locationsCtrl.createRun);

module.exports = router;