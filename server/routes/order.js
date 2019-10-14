const { Router } = require("express");
const _ = require("lodash");
const orderRouter = Router();
orderRouter.post("/create", async (req, res) => {
  if (!req.user) {
    res.status(401).send("User not found");
  }
  const { arriveTime, name, price, pic, description } = req.body;
  try {
    const newOrder = new req.db.Order({
      arriveTime,
      name,
      price,
      pic,
      description
    });
    const result = await newOrder.save();
    return res.send(result);
  } catch (error) {
    return res.status(401).send(error);
  }
});

module.exports = orderRouter;
