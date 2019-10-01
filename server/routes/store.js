const { Router } = require("express");
const _ = require("lodash");
const storeRouter = Router();
const auth = require("../middleware/authentication")
storeRouter.post("/open", auth, async (req, res) => {
    if (!req.user) {
        res.status(401).send("User not found")
    }
    const body = _.pick(req.body, [
        "name", "phone", "address", "businesshours"
    ]);

    body.owner = req.user._id
    try {
        const newStore = new req.body.Store(body)
        console.log(newStore)
        const result = await newStore.save()
        return res.send(result)
    } catch (error) {
        console.log(error)
        return res.status(401).send(result)
    }
});



module.exports = storeRouter;
