const { Router } = require("express");
const _ = require("lodash");
const router = Router();

router.post("/signup", async (req, res) => {
  const body = _.pick(req.body, [
    "password",
    "age",
    "email",
    "role",
    "name",
    "phone"
  ]);

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
    res.send(user.toJSON());
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
    res.send(user.toJSON());
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
  res.send(req.user.toJSON());
});

router.patch("/user", async (req, res) => {
  if (!req.user && !req.token)
    return res.status(401).send("You must to be login!");
  const body = _.pick(req.body, ["name", "age", "phone"]);
  await req.user.updateOne({ $set: body });
  const updatedUser = await req.db.User.findById(req.user._id);
  res.send(updatedUser.toJSON());
});

router.patch("/password", async (req, res) => {
  if (!req.user && !req.token)
    return res.status(401).send("You must to be login!");
  const body = _.pick(req.body, ["password"]);
  req.user.password = body.password;
  const updatedUser = await req.user.save();
  res.send(updatedUser.toJSON());
});

module.exports = router;
