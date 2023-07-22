const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const privateKeyPath = path.resolve(
  process.cwd(),
  process.env.JWT_SECRET_PRIVATE_KEY
);
const publicKeyPath = path.resolve(
  process.cwd(),
  process.env.JWT_SECRET_PUBLIC_KEY
);

const signJwt = async (payload, options = {}) => {
  const expiresIn = options.expiresIn || "356d";
  const privateKey = await fs.promises.readFile(privateKeyPath, "utf8");
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256", //todo: hs256
    expiresIn,
  });
};

const verifyJwt = async (token) => {
  try {
    const privateKey = await fs.promises.readFile(privateKeyPath, "utf8");
    return jwt.verify(token, privateKey);
  } catch (error) {
    return null;
  }
};

module.exports = { signJwt, verifyJwt };
