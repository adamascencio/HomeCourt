const Location = require('../../models/location');

module.exports = {
  createRun, 
  getUserRuns,
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
  const userRuns = await Location.find({'runs.creator': req.user._id});
  console.log('userRuns: ', userRuns);
  res.json(userRuns);
}
