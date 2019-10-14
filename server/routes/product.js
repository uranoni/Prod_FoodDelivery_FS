const { Router } = require("express");
const _ = require("lodash");
const productRouter = Router();
productRouter.post("/create", async (req, res) => {
  // if (!req.user) {
  //   res.status(401).send("User not found");
  // }
  const { cal, pic, name, description, price, store } = req.body;
  try {
    // const menu = await req.db.Menu.findOne({ _id: menu_id });
    // if (!menu) {
    //   return res.status(404).send("can not find this menu");
    // }
    const product = new req.db.Product({
      name,
      description,
      price,
      cal,
      pic,
      store
    });
    const product_res = await product.save();

    return res.send(product_res);
  } catch (error) {
    return res.status(402).send(error);
  }
});

productRouter.delete("/remove/:id", async (req, res) => {
  const { _id } = req.params;
  if (!req.user) {
    res.status(404).send("user not found");
  }

  try {
    const result = await req.db.Menu.findOneAndRemove({ _id });
    if (!result) {
      res.status(404).send("can not find this menu");
    }
    res.send(reslut);
  } catch (error) {}
});

productRouter.get("/getall/:store", async (req, res) => {
  const { store } = req.params;
  // console.log("qw");
  try {
    const result = await req.db.Product.find({ store: store });

    res.send(result);
  } catch (error) {
    res.send("can not found");
  }
});
module.exports = productRouter;
