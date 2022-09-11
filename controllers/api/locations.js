const Location = require('../../models/location');

module.exports = {
  createLocation,
}

async function createLocation(req, res) {
  const court = await Location.findOne({googleId: req.body.googleId});
  if (court) {
   res.json(court); 
  } else {
    const newCourt = new Location(req.body);
    await newCourt.save();
    res.json(newCourt);
  }
}