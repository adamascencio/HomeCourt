const Location = require('../../models/location');

module.exports = {
  createLocation,
  createRun,
}

async function createLocation(req, res) {
  const court = await Location.findOne({googleId: req.body.googleId});
  if (court) {
   res.json(court); 
  } else {
    const location = new Location(req.body);
    await location.save();
    res.json(location);
  }
}

async function createRun(req, res) {
  const id = req.body.placeId;
  const reqBody = req.body.runData;
  reqBody.creator = req.user._id;
  reqBody.time = parseInt(reqBody.time);
  reqBody.date = new Date(reqBody.date);
  const newRun = await Location.findById(id);
  newRun.runs.push(reqBody);
  await newRun.save();
  res.json(newRun);
}

