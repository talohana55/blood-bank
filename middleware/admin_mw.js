const ApiError = require("../exceptions/api-error");

const verifyAdmin = (req, res, next) => {
  if (req.user.userType === "Admin") {
    return next();
  } else {
    return next(
      new ApiError(403, "You are not authorized to perform this action")
    );
  }
};

module.exports = verifyAdmin;
