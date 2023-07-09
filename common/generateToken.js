const { signJwt } = require("./jwt");

async function generateToken(user) {
  const payload = {
    _id: user._id.toString(),
    email: user.email ? user.email : "",
    type: user.type,
  };
  return await signJwt(payload);
}

module.exports = generateToken;
