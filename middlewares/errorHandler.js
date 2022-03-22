const errorHandler = (err, req, res, next) => {
  let errors;
  switch (err.name) {
    case "Unauthorized":
      res.status(err.code).json({ message: err.message });
      break;
    case "SequelizeUniqueConstraintError":
      errors = err.errors.map((err) => err.message);
      res.status(400).json({ message: errors });
      break;
    case "SequelizeValidationError":
      errors = err.errors.map((err) => err.message);
      res.status(400).json({ message: errors });
      break;
    case "Request Not Found":
      res.status(err.code).json({ message: err.message });
      break;
    case "Forbidden":
      res.status(err.code).json({ message: err.message });
      break;
    case "Bad Request":
      res.status(err.code).json({ message: err.message });
      break;
      case "AuthenticationFailed":
        res.status(401).json({message: "not authorized"})
    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorHandler;