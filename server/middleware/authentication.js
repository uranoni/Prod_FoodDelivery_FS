const authentication = async (req, res, next) => {
  var token = req.header("access_token");
  if (token) {
    const user = await req.db.User.findByToken(token);
    req.user = user;
    req.token = token;
  }
  next();
};

module.exports = authentication;
