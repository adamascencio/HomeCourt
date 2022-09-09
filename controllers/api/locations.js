const Location = require('../../models/location');

module.exports = {
  create,
}

async function create(req, res) {
  const location = new Location(req.body);
  await location.save();
  res.json(location);
}