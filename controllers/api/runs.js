const Location = require('../../models/location');

module.exports = {
  createRun, 
  getUserRuns,
  getAllRuns,
  joinRun,
  deleteRun,
  leaveRun
}

async function createRun(req, res) {
  const id = req.body.placeId;
  const reqBody = req.body.runData;
  reqBody.creator = req.user._id;
  reqBody.time = parseInt(reqBody.time);
  reqBody.date = new Date(reqBody.date);
  reqBody.players = [req.user._id];
  const newRun = await Location.findById(id);
  newRun.runs.push(reqBody);
  await newRun.save();
  res.json(newRun);
  console.log(newRun);
}

async function getUserRuns(req, res) {
  const userRuns = await Location.find({'runs.players': req.user._id});
  console.log('userRuns: ', userRuns);
  res.json(userRuns);
}

async function getAllRuns(req, res) {
  const allRuns = await Location.find({});
  console.log('test: ', allRuns);
  res.json(allRuns);
}

async function joinRun(req, res) {
  console.log('req.body: ', req.body);
  const run = await Location.findOne({'runs._id': req.body.runId});
  console.log('run: ', run);
  const runToJoin = run.runs.find(run => run._id == req.body.runId);
  console.log('run to join: ', runToJoin);
  runToJoin.players.push(req.user._id);
  console.log('joined run: ', runToJoin);
  await run.save();
  res.json(run);
}

async function deleteRun(req, res) {
  const run = await Location.findOne({'runs._id': req.body.runId});
  const runToDelete = run.runs.find(run => run._id == req.body.runId);
  run.runs.remove(runToDelete);
  await run.save();
  res.json(run);
}

async function leaveRun(req, res) {
  const run = await Location.findOne({'runs._id': req.body.runId});
  const runToLeave = run.runs.find(run => run._id == req.body.runId);
  runToLeave.players.remove(req.user._id);
  await run.save();
  res.json(run);
}
