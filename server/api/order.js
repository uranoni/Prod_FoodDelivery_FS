const express = require("express");
const _ = require("lodash");

const Order = require("../model/order");
const OrderRouter = express.Router();

OrderRouter.post("/createOrder", async (req, res) => {
    var body = _.pick(req.body, ["receiver", "order", "subaddress", "readdress", "paymethods"]);
    var order = new Order(body);
    try {
        const result = await order.save();
        return res.send(result);
    } catch (error) {
        Promise.reject("fail");
        console.log(error)
        return res.status(400).send("fail to create");
    }

});

OrderRouter.get("/showAll", async (req, res) => {
    const result = await Order.find();

    res.send(result);
});

OrderRouter.get("/detail/:id", async (req, res) => {
    var _id = req.params.id;
    console.log(_id);
    const result = await Order.findOne({ _id: _id })
    res.send(result);
});

module.exports = OrderRouter;