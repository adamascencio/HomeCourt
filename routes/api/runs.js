const express = require('express');
const router = express.Router();
const runsCtrl = require('../../controllers/api/runs');

// GET /api/runs
router.get('/', runsCtrl.getUserRuns);

// GET /api/runs/local
router.get('/local', runsCtrl.getAllRuns);

// POST /api/runs/new
router.post('/new', runsCtrl.createRun);

// PUT /api/runs/join
router.put('/join', runsCtrl.joinRun);

// DELETE /api/runs/delete
router.delete('/delete', runsCtrl.deleteRun);

// DELETE /api/runs/leave
router.delete('/leave', runsCtrl.leaveRun);

module.exports = router;