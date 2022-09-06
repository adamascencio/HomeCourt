const fetch = require('node-fetch');

const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&components=postal_code:`;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
};

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error('Invalid Credentials');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid Credentials');
    const token = createJWT(user);
    res.json(token);
  } catch (e) {
    res.status(400).json(e);
  }
}

async function create(req, res) {
  try {
    const response = await fetch(`${BASE_URL}${req.body.zipCode}`);
    const data = await response.json();
    req.body.lat = data.results[0].geometry.location.lat;
    req.body.long = data.results[0].geometry.location.lng;
    const user = await User.create(req.body);
    // token is a string
    const token = createJWT(user);
    // Yes, we can serialize (to JSON) strings
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // additional data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
