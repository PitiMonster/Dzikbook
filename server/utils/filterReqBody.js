module.exports =
  (...allowedFields) =>
  (req, res, next) => {
    const filteredObj = {};
    for (obj of allowedFields) {
      filteredObj[obj] = req.body[obj];
    }
    req.body = filteredObj;
    next();
  };
