const { Router } = require("express");
const _ = require("lodash");
const storeRouter = Router();
storeRouter.post("/open", async (req, res) => {
    if (!req.user) {
        res.status(401).send("User not found")
    }
    
    const body = _.pick(req.body, [
        "name", "phone", "address", "businesshours",'location'
    ]);
    body.owner = req.user._id
    try {
        const newStore = new req.db.Store(body)
        const result = await newStore.save()
        return res.send(result)
    } catch (error) {
        return res.status(401).send(error)
    }
});

storeRouter.post('/create')

module.exports = storeRouter;
