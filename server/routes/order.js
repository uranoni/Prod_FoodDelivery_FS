const { Router } = require("express");
const _ = require("lodash");
const orderRouter = Router();
orderRouter.post("/create", async (req, res) => {
  if (!req.user) {
    console.log("qwe");
    res.status(401).send("User not found");
  }
  console.log(req.user);
  const { arriveTime, arriveAddress, product, payment, reciver } = req.body;
  try {
    const newOrder = new req.db.Order({
      arriveTime,
      arriveAddress,
      payment,
      reciver,
      product,
      order: req.user._id
    });
    const result = await newOrder.save();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(402).send(error);
  }
});

orderRouter.get("/find", async (req, res) => {
  if (!req.user) {
    console.log("qwe");
    res.status(401).send("User not found");
  }
  // const { user } = req.parms;
  try {
    const result = await req.db.Order.find({ order: req.user._id }).populate(
      "product"
    );
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(402).send(error);
  }
});
module.exports = orderRouter;
