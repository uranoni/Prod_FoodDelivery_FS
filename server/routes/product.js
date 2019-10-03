const { Router } = require("express");
const _ = require("lodash");
const productRouter = Router();
productRouter.post("/create", async (req, res) => {
  if (!req.user) {
    res.status(401).send("User not found");
  }
  const { menu_id, name, description, price } = req.body;
  try {
    const menu = await req.db.Menu.findOne({ _id: menu_id });
    if (!menu) {
      return res.status(404).send("can not find this menu");
    }
    const product = new req.db.Product({ name, description, price });
    const product_res = await product.save();
    menu.products.push({ online: true, product: product_res._id });
    menu.save();
    return res.send(product);
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

module.exports = productRouter;
