const express = require('express');
const router = express.Router();
const runsCtrl = require('../../controllers/api/runs');

// GET /api/runs
router.get('/', runsCtrl.getUserRuns);

// GET /api/runs/local
router.get('/local', runsCtrl.getNonUserRuns);

// POST /api/runs/new
router.post('/new', runsCtrl.createRun);

module.exports = router;