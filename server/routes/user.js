const { Router } = require("express");
const _ = require("lodash");
const router = Router();

router.post("/signup", async (req, res) => {
  const body = _.pick(req.body, ["password", "username", "email", "role"]);

  const user_agent = req.get("user-agent");
  const request_ip = req.connection.remoteAddress;
  const newUser = new req.db.User(body);
  try {
    const saveUser = await newUser.save();
    const { token, user } = await saveUser.generateAuthToken(
      request_ip,
      user_agent
    );
    res.header("access_token", token);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const body = _.pick(req.body, ["password", "email"]);

  const user_agent = req.get("user-agent");
  const request_ip = req.connection.remoteAddress;
  try {
    const authUser = await req.db.User.findByCredentials(
      body.email,
      body.password
    );
    const { token, user } = await authUser.generateAuthToken(
      request_ip,
      user_agent
    );
    res.header("access_token", token);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/logout", (req, res) => {
  if (!req.user) {
    return res.status(400).send("您尚未登入！");
  }
  req.user
    .updateOne({
      $pull: {
        tokens: { token: req.token }
      }
    })
    .then(result => {
      res.send({ message: "logout success!" });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get("/user", (req, res) => {
  if (!req.user && !req.token)
    return res.status(401).send("You must to be login!");
  res.send(req.user);
});

router.patch("/user", async (req, res) => {
  if (!req.user && !req.token)
    return res.status(401).send("You must to be login!");
  const body = _.pick(req.body, ["username"]);
  await req.user.updateOne({ $set: body });
  const updatedUser = await req.db.User.findById(req.user._id);
  res.send(updatedUser);
});

router.patch("/password", async (req, res) => {
  if (!req.user && !req.token)
    return res.status(401).send("You must to be login!");
  const body = _.pick(req.body, ["password"]);
  req.user.password = body.password;
  const updatedUser = await req.user.save();
  res.send(updatedUser);
});

module.exports = router;
